<script setup lang="ts">
const isDialogOpen = ref(false)
const dialogOriginX = ref<number>(50)
const dialogOriginY = ref<number>(50)

// Hitung origin position dari button
function openLogoutDialog(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()

    // Hitung posisi relative terhadap viewport dalam persen
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100

    dialogOriginX.value = x
    dialogOriginY.value = y

    isDialogOpen.value = true
}
</script>

<template>
    <div class="min-h-screen bg-background-bg">
        <LayoutHeader />



        <LayoutSidebar />
        <main class="lg:pl-64 pt-12  h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 transition-all duration-300">
            <!-- Scrollable Content Area -->
            <div class="h-full overflow-y-auto mt-1 pe-1">
                <!-- Content Card Shell -->
                <div
                    class="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-4 w-full relative">
                    <NuxtPage />
                    <UiButton variant="danger" type="button" @click="openLogoutDialog">
                        Logout
                    </UiButton>
                </div>
            </div>
            <UiDialog v-model:open="isDialogOpen" :origin-x="dialogOriginX" :origin-y="dialogOriginY">
                <template #title>
                    Konfirmasi
                </template>

                <template #description>
                    Apakah Anda yakin ingin melanjutkan?
                </template>

                Isi konten dialog di sini…

                <template #footer>
                    <button class="px-4 py-2 border rounded" @click="isDialogOpen = false">
                        Batal
                    </button>
                    <button class="px-4 py-2 bg-primary-600 text-white rounded">
                        Lanjutkan
                    </button>
                </template>
            </UiDialog>
        </main>

    </div>
</template>
