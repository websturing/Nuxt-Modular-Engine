
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    const publicRoutes = ['/login', '/register', '/forgot-password']
    const isPublicRoute = publicRoutes.includes(to.path)
    const token = authStore.token

    if (!token && !isPublicRoute) {
        return navigateTo('/login')
    }

    if (token && isPublicRoute) {
        return navigateTo('/dashboard')
    }
})