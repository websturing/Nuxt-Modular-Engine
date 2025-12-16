<script setup lang="ts">



</script>

<template>
    <div class="min-h-screen w-full flex p-4 gap-4 bg-gray-50 dark:bg-gray-900">
        <!-- Left Side: Login Form Area (Slot) -->
        <div class="w-full lg:w-[55%] flex flex-col items-center justify-center  overflow-hidden">
            <div class="w-full max-w-md p-8">
                <slot />
            </div>
        </div>

        <!-- Right Side: Decorative/Branding Area -->
        <div
            class="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl relative overflow-hidden items-center justify-center text-white">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10">
            </div>

            <!-- Content Overlay -->
            <div class="relative z-10 text-center p-12">
                <slot name="branding">
                    <h2 class="text-3xl font-bold mb-4">Enterprise System</h2>
                    <p class="text-primary-100 text-lg">Manage your production seamlessly with our advanced sewing
                        application.</p>
                </slot>

            </div>

            <!-- Abstract Shapes -->
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
    </div>
</template>
