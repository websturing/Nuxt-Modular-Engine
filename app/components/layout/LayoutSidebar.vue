<script setup lang="ts">
const sidebarOpen = ref(false)
const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'Home' },
    { name: 'Products', path: '/products', icon: 'Home' },
    { name: 'Orders', path: '/orders', icon: 'Home' },
    { name: 'Settings', path: '/settings', icon: 'Home' },
]
const { currentTheme } = useTheme()
</script>

<template>
    <div>
        <aside :class="[
            'fixed top-0 left-0 bottom-0 w-64 z-10 transition-transform duration-300',
            'h-[calc(100vh-0.5rem)]',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0'
        ]">
            <div
                class="bg-sidebar-bg text-primary-50 h-full flex flex-col overflow-hidden m-1 rounded-lg p-1 transition-colors duration-300">
                <div class="text-center my-5 text-lg font-semibold tracking-wide">
                    Sewing Application {{ currentTheme }}
                </div>
                <div class="flex-1 overflow-y-auto p-2">
                    <nav class="space-y-2">
                        <NuxtLink v-for="item in menuItems" :key="item.path" :to="item.path" :class="[
                            'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
                            'hover:bg-white/10 hover:text-white',
                            $route.path === item.path
                                ? 'bg-primary-600 text-white shadow-md'
                                : 'text-primary-200'
                        ]">
                            <UiIcon :name="item.icon" size="20" />
                            <span>{{ item.name }}</span>
                        </NuxtLink>
                    </nav>
                    <!-- Konten lainnya bisa ditambahkan di sini -->
                </div>

                <!-- Footer tetap di bawah -->
                <div class="p-2 text-center text-xs text-gray-500">
                    &copy; 2024
                </div>
            </div>
        </aside>
    </div>
</template>