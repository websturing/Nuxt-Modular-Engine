// composables/usePermission.ts
import { useAuthStore } from '~/stores/auth';

export const usePermission = () => {
    const authStore = useAuthStore()
    const test = "adni";
    /**
     * Fungsi untuk mengecek apakah user memiliki permission tertentu
     * @param    - Nama permission (contoh: 'dashboard.create')
     */
    const can = (name: string): boolean => {
        // 1. Ambil list permission dari store
        const userPermissions = authStore.permissions || []

        // (Opsional) Bypass jika user adalah Super Admin
        // Jika kamu punya logic role khusus, bisa pasang di sini.
        // if (authStore.user?.roleNames.includes('Super Admin')) return true;

        // 2. Cek apakah permission ada di dalam array
        return userPermissions.includes(name)
    }

    /**
     * Fungsi untuk mengecek jika user punya SALAH SATU dari array permission
     * (Berguna jika satu tombol boleh diakses oleh create ATAU update)
     */
    const canAny = (names: string[]): boolean => {
        const userPermissions = authStore.permissions || []
        return names.some(name => userPermissions.includes(name))
    }

    return {
        can,
        canAny,
        test
    }
}