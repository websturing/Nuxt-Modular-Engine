// stores/auth.ts
import { defineStore } from 'pinia'
import { LoginResponseSchema, type LoginForm, type Menu, type Permissions, type User } from '~/schemas/auth'

export const useAuthStore = defineStore('auth', () => {
    // 1. GUNAKAN useCookie UNTUK TOKEN (Agar terbaca di SSR)
    // Token ini otomatis reaktif & tersimpan di cookie browser
    const token = useCookie<string | null>('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 7 Hari
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        watch: true // Penting agar perubahan terdeteksi
    })

    // State lainnya tetap menggunakan ref biasa (akan di-handle pinia-plugin-persistedstate)
    const user = ref<User | null>(null)
    const permissions = ref<Permissions>([])
    const menus = ref<Menu>([])

    // Computed
    const isAuthenticated = computed(() => !!token.value)

    // Actions
    async function login(credentials: LoginForm) {
        try {
            const { data, error } = await useApi('auth/login', {
                method: 'POST',
                body: credentials,
            });

            if (error.value) {
                const serverMessage = error.value.data?.message || error.value.statusMessage;
                throw new Error(serverMessage || 'Gagal menghubungi server');
            }

            const parsed = LoginResponseSchema.safeParse(data.value);
            if (!parsed.success) throw new Error("Format respons tidak valid.");

            const responseData = parsed.data;
            if (!responseData.status) throw new Error(responseData.message || "Login gagal.");

            const result = responseData.data;

            // 2. SET TOKEN (Otomatis update cookie & state)
            token.value = result.accessToken;

            // Set state lainnya
            user.value = result.user;
            menus.value = result.menu;
            permissions.value = result.permissions;

            return { message: parsed.data.message, user: result.user };

        } catch (err: any) {
            throw err;
        }
    }

    async function logout() {
        try {
            await useApi('/auth/logout', { method: 'POST' });
        } catch (error) {
            // Ignore error
        } finally {
            // 3. HAPUS TOKEN & DATA
            token.value = null; // Otomatis menghapus cookie
            user.value = null;
            permissions.value = [];
            menus.value = [];

            const router = useRouter();
            router.push('/login');
        }
    }

    async function fetchUser() {
        if (!token.value) return; // Guard clause
        try {
            const { data, error } = await useApi('auth/me');
            if (error.value) throw error.value;

            const result = data.value as any;
            if (result?.data) {
                user.value = result.data;
            }
        } catch (err) {
            console.error('Fetch user failed', err);
            // Opsional: jika fetch user gagal (misal token expired), logout
            // logout(); 
        }
    }

    return {
        login,
        logout,
        menus,
        fetchUser,
        user,
        token,
        permissions,
        isAuthenticated
    }
},
    {
        // 4. KONFIGURASI PERSIST
        // Kita exclude 'token' karena token sudah di-handle manual oleh useCookie di atas
        // Kita hanya perlu menyimpan user, permissions, dan menu agar tidak hilang saat refresh
        persist: {
            key: 'auth_data',
            storage: {
                getItem: (key) => {
                    if (process.client) {
                        return localStorage.getItem(key)
                    }
                    return null
                },
                setItem: (key, value) => {
                    if (process.client) {
                        localStorage.setItem(key, value)
                    }
                },
            },            // 2. Filter paths tetap sama
            pick: ['user', 'permissions', 'menus'],
            debug: true
        }
    })