<script setup lang="ts">

const isLoading = ref<boolean>(false)
const { isLogoutDialogOpen } = storeToRefs(useUiStore())
const { closeLogoutDialog } = useUiStore()
const { logout } = useAuthStore()

const handleLogout = async () => {
    isLoading.value = true
    await logout()
    isLoading.value = false
    closeLogoutDialog()
}

</script>

<template>
    <div class="min-h-screen bg-background-bg">
        <Header />



        <Sidebar />
        <main class="lg:pl-64 pt-12  h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-all duration-300">
            <!-- Scrollable Content Area -->
            <div class="h-full overflow-y-auto mt-1 pe-1">
                <!-- Content Card Shell -->
                <div
                    class="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-5 w-full relative">
                    <NuxtPage />
                </div>
            </div>

        </main>



        <UiDialog v-model:open="isLogoutDialogOpen">
            <template #title>
                Logout
            </template>
            <p class="text-gray-500">
                Are you sure you want to log out? Unsaved changes will be lost.
            </p>
            <template #footer>
                <UiButton type="button" variant="secondary" @click="closeLogoutDialog">
                    Batal
                </UiButton>
                <UiButton variant="danger" :loading="isLoading" @click="handleLogout" type="button"
                    icon="solar:logout-broken" icon-pos="right" class="!text-gray-100">
                    Logout
                </UiButton>
            </template>
        </UiDialog>

    </div>
</template>
