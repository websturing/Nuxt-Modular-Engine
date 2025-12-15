// app/features/admin-layout/composables/useAdminLayout.ts
export const useAdminLayout = () => {
    const isSidebarOpen = useState<boolean>('admin-sidebar-state', () => false); // Default false untuk mobile-first approach biasanya

    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
    };

    // Tambahkan fungsi ini
    const closeSidebar = () => {
        isSidebarOpen.value = false;
    };

    return {
        isSidebarOpen,
        toggleSidebar,
        closeSidebar
    };
};