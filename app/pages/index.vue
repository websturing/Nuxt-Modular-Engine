<script setup lang="ts">
/**
 * Home Page
 */
</script>

<template>
    <NuxtLayout>
        <div class="text-center py-16">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Sewing App
            </h1>
            <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Built with Nuxt 4, Reka UI, and Tailwind CSS.
                A modern, enterprise-grade frontend architecture.
            </p>

            <div class="flex justify-center gap-4">
                <UiButton size="lg" @click="navigateTo('/demo')">
                    View Components Demo
                </UiButton>
                <UiButton size="lg" variant="outline">
                    Documentation
                </UiButton>
            </div>
        </div>

        <!-- Features -->
        <div class="grid md:grid-cols-3 gap-6 mt-12">
            <UiCard hoverable>
                <div class="text-center">
                    <div
                        class="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Modular Architecture</h3>
                    <p class="text-sm text-gray-600">
                        DDD-style modules for scalable and maintainable code structure.
                    </p>
                </div>
            </UiCard>

            <UiCard hoverable>
                <div class="text-center">
                    <div
                        class="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Headless UI</h3>
                    <p class="text-sm text-gray-600">
                        Full control over styling with Reka UI accessibility built-in.
                    </p>
                </div>
            </UiCard>

            <UiCard hoverable>
                <div class="text-center">
                    <div
                        class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 class="font-semibold text-gray-900 mb-2">Type-Safe API</h3>
                    <p class="text-sm text-gray-600">
                        Enterprise-grade API layer with TypeScript and auto-retry.
                    </p>
                </div>
            </UiCard>
        </div>
    </NuxtLayout>
</template>
