<script setup lang="ts">
import { NuxtLink } from '#components'; // Terkadang perlu import eksplisit jika dipakai di dynamic component :is

// Tidak perlu define interface jika tidak diprops, tapi bagus untuk type safety
interface Menu {
    name: string;
    slug: string;
    icon: string;
    children?: Menu[];
}

const router = useRouter()
const sidebarRef = ref(null);
const { isSidebarOpen, closeSidebar } = useAdminLayout();
const { menus } = useAuth()
const { openLogoutDialog } = useUiStore()

// --- OPTIMASI 1: Gunakan router.hasRoute() ---
// Tidak perlu onMounted untuk simpan array routes. 
// hasRoute() sangat cepat dan reactive-safe jika dipanggil di computed/render.

const processedMenu = computed(() => {
    // Helper function kecil
    const checkRoute = (slug: string) => router.hasRoute(slug);

    return menus.value.map(item => ({
        ...item,
        exists: checkRoute(item.slug),
        children: item.children?.map(child => ({
            ...child,
            exists: checkRoute(child.slug)
        })) || []
    }))
})

onClickOutside(sidebarRef, () => {
    if (isSidebarOpen.value) closeSidebar();
}, { ignore: ['.js-sidebar-toggle'] });

</script>

<template>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"></div>
    </Transition>

    <aside ref="sidebarRef" :class="[
        'fixed left-0 bottom-0 w-64 z-50 transition-transform duration-300 p-1 top-12',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
    ]">
        <div class="bg-sidebar-bg shadow-lg text-primary-50 h-full flex flex-col overflow-hidden rounded-lg p-1">

            <ClientOnly>
                <div class="flex-1 overflow-y-auto p-2 mt-3">
                    <nav>
                        <template v-for="item in processedMenu" :key="item.slug">

                            <component :is="item.exists ? NuxtLink : 'div'"
                                :to="item.exists ? { name: item.slug } : undefined" :class="[
                                    'flex items-center gap-2 px-3 py-2 shadow-none transition-all duration-200 rounded-md',
                                    !item.exists ? 'opacity-50 cursor-not-allowed bg-gray-100/5' : ''
                                ]" active-class="bg-white/10 text-white font-medium">
                                <span>{{ item.name }}</span>

                                <span v-if="!item.exists" class="ml-auto text-[10px] bg-red-500 px-1 rounded">404</span>
                            </component>

                            <div v-if="item.children?.length" class="pl-5 space-y-1 mt-1 ">
                                <template v-for="child in item.children" :key="child.slug">
                                    <component :is="child.exists ? NuxtLink : 'div'"
                                        :to="child.exists ? { name: child.slug } : undefined" :class="[
                                            'flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 text-sm',
                                            !child.exists ? 'opacity-50 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-white/5'
                                        ]" active-class="bg-white/10 text-white !text-white font-medium shadow-sm">
                                        <Icon :name="child.icon" size="18" />
                                        <span>{{ child.name }}</span>
                                    </component>
                                </template>
                            </div>

                        </template>
                    </nav>
                </div>

                <template #fallback>
                    <div class="flex-1 overflow-y-auto p-2 mt-3 space-y-2">
                        <div class="flex gap-3 items-center px-3 py-2 animate-pulse" v-for="i in 6" :key="i">
                            <div class="size-6 bg-gray-700/50 rounded-md"></div>
                            <div class="h-4 w-32 bg-gray-700/50 rounded"></div>
                        </div>
                    </div>
                </template>
            </ClientOnly>

            <div class="p-2 border-t border-white/10">
                <button @click="openLogoutDialog"
                    class="w-full flex items-center justify-center gap-2 px-2 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded transition-colors">
                    <Icon name="solar:logout-2-broken" class="w-4 h-4" />
                    Logout
                </button>
            </div>
        </div>
    </aside>
</template>