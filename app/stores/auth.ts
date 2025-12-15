import { LoginResponseSchema, type LoginForm, type Permissions, type User } from '~/schemas/auth'

const defaultState = {
    user: null as User | null,
    token: null as string | null,
    permissions: [] as Permissions
}


export const useAuthStore = defineStore('auth', () => {

    const user = ref<typeof defaultState.user>(defaultState.user)
    const token = ref<typeof defaultState.token>(defaultState.token)
    const permissions = ref<typeof defaultState.permissions>(defaultState.permissions)

    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
    const module = 'auth'

    // stores/auth.ts
    async function login(credentials: LoginForm) {
        try {
            const { data, error } = await useFetch(baseURL + '/' + module + '/login', {
                method: 'POST',
                body: credentials,
            });

            // 1. Handle HTTP Error (401, 422, 500 dari Server)
            if (error.value) {
                // Ambil pesan error spesifik dari backend jika ada
                const serverMessage = error.value.data?.message || error.value.statusMessage;
                throw new Error(serverMessage || 'Gagal menghubungi server');
            }

            // 2. Validasi Zod (Gunakan safeParse agar tidak crash, tapi kita kontrol manual)
            // safeParse lebih aman daripada parse untuk production
            const parsed = LoginResponseSchema.safeParse(data.value);

            if (!parsed.success) {
                console.error("Zod Validation Failed:", parsed.error);
                throw new Error("Format respons dari server tidak valid/berubah.");
            }

            // 3. Handle Logic API (Status: false tapi HTTP 200)
            // Kadang backend return 200 OK tapi isinya { status: false, message: "Wrong Password" }
            const responseData = parsed.data; // Data sudah aman

            if (!responseData.status) {
                throw new Error(responseData.message || "Login gagal.");
            }

            // --- SUCCESS FLOW ---
            const result = responseData.data; // Masuk ke object 'data' yang ada user & token

            token.value = result.access_token;
            user.value = result.user;
            permissions.value = result.permissions;

            const cookieToken = useCookie('auth_token');
            cookieToken.value = result.access_token;

            return {
                message: parsed.data.message,
                user: result.user,
            };

        } catch (err: any) {
            // Log error asli untuk developer
            // console.error(err); 

            // Throw ulang error-nya agar bisa ditangkap oleh Component
            throw err;
        }
    }


    return {
        login,
        user,
        token,
        permissions
    }
})