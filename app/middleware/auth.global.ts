import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()


    // --- LOG  ---
    if (process.client) {
        console.log('--- DEBUG MIDDLEWARE ---')
        console.log('Halaman Tujuan:', to.path)
        console.log('Isi Token di Store:', authStore.token)
        console.log('Status isAuthenticated:', authStore.isAuthenticated)
    }
    // -------------------------

    const publicRoutes = ['/login']


    const isPublicRoute = publicRoutes.includes(to.path)


    if (!authStore.token && !isPublicRoute) {
        return navigateTo('/login')
    }

    if (authStore.token && isPublicRoute) {
        return navigateTo('/dashboard')
    }
})