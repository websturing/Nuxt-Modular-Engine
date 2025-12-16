


export const useUiStore = defineStore('ui', () => {

    const isLogoutDialogOpen = ref(false)

    const openLogoutDialog = () => {
        isLogoutDialogOpen.value = true
    }

    const closeLogoutDialog = () => {
        isLogoutDialogOpen.value = false
    }

    return {
        isLogoutDialogOpen,
        openLogoutDialog,
        closeLogoutDialog
    }
})