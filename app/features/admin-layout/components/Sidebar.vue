<script setup lang="ts">
import { NuxtLink } from '#components';
interface Permission {
    action: string
    permission_name: string
}


const router = useRouter()
const sidebarRef = ref(null);
const { isSidebarOpen, closeSidebar } = useAdminLayout();
const existingRoutes = ref<string[]>([])

const { menus } = useAuth()

onMounted(() => {
    existingRoutes.value = router.getRoutes().map(r => String(r.name))
})

const routeExists = (name: string) =>
    existingRoutes.value.includes(name)

onClickOutside(sidebarRef, () => {
    if (isSidebarOpen.value) {
        closeSidebar();
    }
}, {
    ignore: ['.js-sidebar-toggle']
});


const processedMenu = computed(() =>
    menus.value.map(item => ({
        ...item,
        exists: routeExists(item.slug),
        children: item.children?.map(child => ({
            ...child,
            exists: routeExists(child.slug)
        })) || []
    }))
)

const { currentTheme } = useTheme()
const { openLogoutDialog } = useUiStore()



</script>

<template>
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isSidebarOpen" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity">
        </div>
    </Transition>

    <aside ref="sidebarRef" :class="[
        'fixed left-0 bottom-0 w-64 z-50 transition-transform duration-300 p-1',
        'top-12',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
    ]">

        <div class="bg-sidebar-bg shadow-lg text-primary-50 h-full flex flex-col overflow-hidden rounded-lg p-1">

            <ClientOnly>
                <!-- MENU -->
                <div class="flex-1 overflow-y-auto p-2 mt-3">
                    <nav class="">
                        <template v-for="item in processedMenu" :key="item.slug">

                            <!-- === LEVEL 1 === -->
                            <component :is="item.exists ? NuxtLink : 'div'"
                                :to="item.exists ? { name: item.slug } : undefined" :class="[
                                    'flex items-center gap-2 px-3 py-2 shadow-none transition-all duration-200',
                                    item.exists
                                        ? 'hover:bg-white/10 hover:text-white'
                                        : 'opacity-50 cursor-not-allowed',
                                    $route.name === item.slug && item.exists
                                        ? 'router-active'
                                        : 'router-inactive'
                                ]">
                                <Icon :name="item.icon" size="24" v-if="item.children.length <= 0" />
                                <span>{{ item.name }}</span>
                            </component>

                            <!-- === CHILDREN === -->
                            <div v-if="item.children.length" class="pl-5 space-y-1 mt-1">

                                <template v-for="child in item.children" :key="child.slug">
                                    <component :is="child.exists ? NuxtLink : 'div'"
                                        :to="child.exists ? { name: child.slug } : undefined" :class="[
                                            'flex items-center gap-2 px-1 py-1 rounded-lg transition-all duration-200',
                                            child.exists
                                                ? 'hover:bg-white/10 hover:text-white'
                                                : 'opacity-50 cursor-not-allowed',
                                            $route.name === child.slug && child.exists
                                                ? 'router-active'
                                                : 'router-inactive'
                                        ]">
                                        <Icon :name="child.icon" size="20" />
                                        <span>{{ child.name }}</span>
                                    </component>
                                </template>

                            </div>

                        </template>

                    </nav>
                </div>
                <template #fallback>
                    <div class="flex-1 overflow-y-auto p-2 mt-3 space-y-1">
                        <div class="flex gap-2 items-center px-3 py-2 animate-pulse rounded-lg" v-for="i in 10"
                            :key="i">
                            <div class="size-6 bg-primary-600 rounded"></div>
                            <div class="h-4 w-32 bg-primary-600 rounded"></div>
                        </div>
                    </div>
                </template>
            </ClientOnly>
            <!-- FOOTER -->
            <div class="p-2 flex flex-col gap-2 text-xs text-center">
                <UiButton variant="danger" type="button" class="w-full" @click="openLogoutDialog">
                    Logout
                </UiButton>
                &copy; 2024
            </div>

        </div>
    </aside>
</template>