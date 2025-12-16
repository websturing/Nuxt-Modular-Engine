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

    const isAuthenticated = computed(() => !!token.value)
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase
    const module = 'auth'


    // stores/auth.ts
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

            if (!parsed.success) {
                console.error("Zod Validation Failed:", parsed.error);
                throw new Error("Format respons dari server tidak valid/berubah.");
            }
            const responseData = parsed.data;

            if (!responseData.status) {
                throw new Error(responseData.message || "Login gagal.");
            }


            const result = responseData.data;

            token.value = result.accessToken;
            user.value = result.user;
            permissions.value = result.permissions;

            const cookieToken = useCookie('auth_token');
            cookieToken.value = result.accessToken;

            return {
                message: parsed.data.message,
                user: result.user,
            };

        } catch (err: any) {
            throw err;
        }
    }

    async function logout() {
        try {
            await useApi('/auth/logout', { method: 'POST' });
        } catch (error) {
            // Abaikan error api, lanjut cleanup local
        } finally {
            token.value = null;
            user.value = null;
            permissions.value = [];

            const router = useRouter();
            router.push('/login');
        }
    }

    async function fetchUser() {
        try {
            const { data, error } = await useApi('auth/me');

            if (error.value) {
                throw error.value
            }

            const result = data.value as any;
            if (result?.data) {
                user.value = result.data
            }

            return result;
        } catch (err) {
            console.error('Fetch user failed', err)
        }
    }


    return {
        login,
        logout,
        fetchUser,
        user,
        token,
        permissions,
        isAuthenticated
    }
},
    {
        persist: {
            key: 'auth'
        }
    })