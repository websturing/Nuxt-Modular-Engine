export const useAuth = () => {
    const store = useAuthStore()
    const { menus, permissions } = storeToRefs(store)
    return {
        menus,
        permissions
    }
}