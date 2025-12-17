<script setup lang="ts">
const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<template>
    <div
        class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 transition-colors duration-300 dark:bg-slate-900">
        <!-- Abstract Background Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary-500/10 blur-[100px]"></div>
            <div class="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]"></div>
        </div>

        <div class="relative z-10 w-full max-w-lg text-center">

            <!-- 404 Glitch/Gradient Effect -->
            <div class="relative mb-6 inline-block">
                <h1 class="text-red-600 text-3xl font-black tracking-tighter text-transparent sm:text-[150px]">
                    404
                </h1>
            </div>

            <!-- Message -->
            <div class="space-y-3 flex flex-col gap-5">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Oops! Page Not Found
                </h2>
                <p class="mx-auto max-w-md text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The page you are looking for might have been moved, deleted, or never existed.
                </p>
            </div>

            <!-- Interactive Buttons -->
            <div class="flex flex-col items-center justify-center gap-10 sm:flex-row ">
                <!-- Back Button -->
                <button @click="goBack"
                    class="group flex w-full items-center justify-center gap-2 mb-10 rounded-xl border border-gray-200 bg-primary-100 px-6 py-3 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50 sm:w-auto">
                    <Icon name="solar:arrow-left-linear"
                        class="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Go Back</span>
                </button>

                <!-- Home Button -->
                <NuxtLink to="/"
                    class="mt-10 group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-8 py-3 font-medium text-white shadow-lg shadow-primary-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-primary-600/30 sm:w-auto">
                    <span>Back to Dashboard</span>
                    <Icon name="solar:home-smile-linear"
                        class="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </NuxtLink>
            </div>

        </div>

        <!-- Footer Decoration -->
        <div class="absolute bottom-10 text-xs font-medium text-gray-400 dark:text-gray-600">
            &copy; {{ new Date().getFullYear() }} Sewing App System
        </div>
    </div>
</template>