<script setup lang="ts">
const { toggleSidebar } = useAdminLayout();
const { dateTime } = useClientTime()

const user = {
    name: 'admin@gmail.com',
    photo: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
}

</script>

<template>
    <div
        class="h-12 ps-2 pe-4  flex items-center justify-between fixed top-0 right-0 left-0 z-20  transition-all duration-300">
        <!-- Left side -->
        <div class="font-semibold text-lg tracking-tight text-black dark:text-white ">
            <div class="flex items-center gap-3">
                <UiButton icon="solar:hamburger-menu-broken" label="Home" variant="ghost" @click="toggleSidebar"
                    class="lg:hidden" />
                <div
                    class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-lg">
                    <div
                        class="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">
                        S
                    </div>
                    <span class="text-sm font-medium">Sewing Application</span>
                </div>
                <ClientOnly>
                    <p class="text-sm text-gray-500 hidden lg:block"> {{ dateTime }}</p>
                </ClientOnly>
            </div>
        </div>

        <!-- Center Content -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 hidden md:flex">
            <!-- Search -->
            <div class="w-56 focus-within:w-80 md:focus-within:w-96 transition-all duration-300 relative">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                    <input type="text"
                        class="block w-full h-8 pl-10 pr-12 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Search..." />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                        <kbd
                            class="inline-flex items-center h-5 px-1.5 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 font-sans text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            <span class="text-xs mr-0.5">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            <!-- Other Content -->
            <div class="flex items-center gap-4">

            </div>
        </div>
        <!-- Right side -->
        <div class="flex items-center gap-4">
            <div>
                <UiButton icon="solar:bell-bing-bold" label="" variant="ghost" />
            </div>
            <UiDropdown :label="user.name" :avatar="user.photo">
                <div class="px-2 py-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Akun Saya
                </div>

                <NuxtLink to="/profile"
                    class="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                    <Icon name="solar:user-id-broken" class="w-4 h-4" />
                    Profile
                </NuxtLink>

                <NuxtLink to="/settings"
                    class="flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                    <Icon name="solar:settings-broken" class="w-4 h-4" />
                    Settings
                </NuxtLink>

                <div class="h-px bg-gray-100 my-1"></div>

                <button
                    class="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer">
                    <Icon name="solar:logout-2-broken" class="w-4 h-4" />
                    Logout
                </button>
            </UiDropdown>
        </div>

    </div>
</template>