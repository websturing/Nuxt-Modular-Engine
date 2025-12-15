<script setup lang="ts">


const isDialogOpen = ref(false)
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
                    class="min-h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-4 w-full relative">
                    <NuxtPage />
                </div>
            </div>

        </main>

    </div>
</template>
