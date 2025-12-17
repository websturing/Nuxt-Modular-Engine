// middleware/auth.global.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore()
    const publicRoutes = ['/login', '/register', '/forgot-password']
    const isPublicRoute = publicRoutes.includes(to.path)

    // 1. Cek keberadaan Token
    const token = authStore.token

    // A. Jika tidak ada token dan mau ke halaman private -> Tendang login
    if (!token && !isPublicRoute) {
        return navigateTo('/login')
    }

    // B. Jika ada token dan mau ke halaman public (login) -> Lempar ke dashboard
    if (token && isPublicRoute) {
        return navigateTo('/dashboard')
    }

    // C. (LOGIC BARU) SINKRONISASI PERMISSION
    // Jika user sudah login (ada token) dan berada di private route
    if (token && !isPublicRoute) {
        // Kita panggil fetchUser() untuk update permission terbaru dari DB
        // 'await' di sini akan menahan loading page sebentar sampai data terupdate.
        // Ini bagus untuk keamanan (memastikan permission valid sebelum page render).

        // Optimasi: Kamu bisa menambahkan kondisi agar tidak fetch kalau
        // perpindahannya hanya query params, dll. Tapi untuk Admin, fetch every route is safer.
        await authStore.fetchUser()
    }

    // D. (OPSIONAL) Cek Permission Halaman Tertentu
    // Contoh: Jika user mau ke '/settings' tapi gak punya permission 'settings.view'
    // if (to.path === '/settings' && !authStore.permissions.includes('settings.view')) {
    //     return abortNavigation('Anda tidak memiliki akses.') 
    //     // atau return navigateTo('/unauthorized')
    // }
})