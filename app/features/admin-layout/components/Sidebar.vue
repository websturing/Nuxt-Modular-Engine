<script setup lang="ts">
import { NuxtLink } from '#components'
interface Permission {
    action: string
    permission_name: string
}

interface MenuItem {
    id: number
    name: string
    slug: string
    icon: string
    permissions: Permission[]
    children: MenuItem[]
}

const router = useRouter()
const sidebarRef = ref(null);
const { isSidebarOpen, closeSidebar } = useAdminLayout();
const existingRoutes = ref<string[]>([])

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

const menu: MenuItem[] = [
    {
        id: 1,
        name: "Dashboard",
        slug: "dashboard",
        icon: "home-2-broken",
        permissions: [
            { action: "read", permission_name: "dashboard.read" }
        ],
        children: []
    },
    {
        id: 16,
        name: "Operation Planning",
        slug: "operation-planning",
        icon: "OperationsField",
        permissions: [
            { action: "create", permission_name: "operation-planning.create" },
            { action: "read", permission_name: "operation-planning.read" },
            { action: "update", permission_name: "operation-planning.update" },
            { action: "delete", permission_name: "operation-planning.delete" },
            { action: "upload", permission_name: "operation-planning.upload" },
            { action: "download", permission_name: "operation-planning.download" }
        ],
        children: [
            {
                id: 12,
                name: "GL Number",
                slug: "gls",
                icon: "documents-broken",
                permissions: [
                    { action: "create", permission_name: "gls.create" },
                    { action: "read", permission_name: "gls.read" },
                    { action: "update", permission_name: "gls.update" },
                    { action: "delete", permission_name: "gls.delete" },
                    { action: "upload", permission_name: "gls.upload" },
                    { action: "download", permission_name: "gls.download" }
                ],
                children: []
            },
            {
                id: 17,
                name: "Leaders",
                slug: "leaders",
                icon: "shield-user-broken",
                permissions: [
                    { action: "create", permission_name: "leaders.create" },
                    { action: "read", permission_name: "leaders.read" },
                    { action: "update", permission_name: "leaders.update" },
                    { action: "delete", permission_name: "leaders.delete" },
                    { action: "upload", permission_name: "leaders.upload" },
                    { action: "download", permission_name: "leaders.download" }
                ],
                children: []
            }
        ]
    },
    {
        id: 3,
        name: "Transfers",
        slug: "transfers",
        icon: "Movement",
        permissions: [
            { action: "read", permission_name: "transfers.read" },
            { action: "create", permission_name: "transfers.create" },
            { action: "update", permission_name: "transfers.update" },
            { action: "delete", permission_name: "transfers.delete" },
            { action: "upload", permission_name: "transfers.upload" },
            { action: "download", permission_name: "transfers.download" }
        ],
        children: [
            {
                id: 11,
                name: "Stock In",
                slug: "stock-ins",
                icon: "qr-code-broken",
                permissions: [
                    { action: "create", permission_name: "stock-ins.create" },
                    { action: "read", permission_name: "stock-ins.read" },
                    { action: "update", permission_name: "stock-ins.update" },
                    { action: "delete", permission_name: "stock-ins.delete" },
                    { action: "upload", permission_name: "stock-ins.upload" },
                    { action: "download", permission_name: "stock-ins.download" }
                ],
                children: []
            },
            {
                id: 8,
                name: "Stock Out",
                slug: "stockout",
                icon: "cash-out-broken",
                permissions: [
                    { action: "read", permission_name: "stockout.read" },
                    { action: "create", permission_name: "stockout.create" },
                    { action: "update", permission_name: "stockout.update" },
                    { action: "delete", permission_name: "stockout.delete" },
                    { action: "upload", permission_name: "stockout.upload" },
                    { action: "download", permission_name: "stockout.download" }
                ],
                children: []
            },
            {
                id: 9,
                name: "Defect",
                slug: "defect",
                icon: "shield-warning-bold",
                permissions: [
                    { action: "read", permission_name: "defect.read" },
                    { action: "create", permission_name: "defect.create" },
                    { action: "update", permission_name: "defect.update" },
                    { action: "delete", permission_name: "defect.delete" },
                    { action: "upload", permission_name: "defect.upload" },
                    { action: "download", permission_name: "defect.download" }
                ],
                children: []
            }
        ]
    },
    {
        id: 13,
        name: "Lines",
        slug: "lines",
        icon: "turntable-minimalistic-bold",
        permissions: [
            { action: "create", permission_name: "lines.create" },
            { action: "read", permission_name: "lines.read" },
            { action: "update", permission_name: "lines.update" },
            { action: "delete", permission_name: "lines.delete" },
            { action: "upload", permission_name: "lines.upload" },
            { action: "download", permission_name: "lines.download" }
        ],
        children: []
    },
    {
        id: 20,
        name: "Replacements",
        slug: "replacement-title",
        icon: "Forms",
        permissions: [
            { action: "read", permission_name: "replacement-title.read" },
            { action: "create", permission_name: "replacement-title.create" },
            { action: "update", permission_name: "replacement-title.update" },
            { action: "delete", permission_name: "replacement-title.delete" },
            { action: "upload", permission_name: "replacement-title.upload" },
            { action: "download", permission_name: "replacement-title.download" }
        ],
        children: [
            {
                id: 21,
                name: "Tracking Ticket",
                slug: "replacement-tracking",
                icon: "point-on-map-perspective-bold-duotone",
                permissions: [
                    { action: "create", permission_name: "replacement-tracking.create" },
                    { action: "read", permission_name: "replacement-tracking.read" },
                    { action: "update", permission_name: "replacement-tracking.update" }
                ],
                children: []
            },
            {
                id: 18,
                name: "Ticket Request",
                slug: "replacement",
                icon: "chat-unread-bold",
                permissions: [
                    { action: "create", permission_name: "replacement.create" },
                    { action: "read", permission_name: "replacement.read" },
                    { action: "update", permission_name: "replacement.update" },
                    { action: "delete", permission_name: "replacement.delete" },
                    { action: "upload", permission_name: "replacement.upload" },
                    { action: "download", permission_name: "replacement.download" }
                ],
                children: []
            },
            {
                id: 19,
                name: "Approval",
                slug: "replacement-approval",
                icon: "check-read-bold-duotone",
                permissions: [
                    { action: "create", permission_name: "replacement-approval.create" },
                    { action: "read", permission_name: "replacement-approval.read" },
                    { action: "update", permission_name: "replacement-approval.update" },
                    { action: "delete", permission_name: "replacement-approval.delete" },
                    { action: "upload", permission_name: "replacement-approval.upload" },
                    { action: "download", permission_name: "replacement-approval.download" }
                ],
                children: []
            }
        ]
    }
]

const processedMenu = computed(() =>
    menu.map(item => ({
        ...item,
        exists: routeExists(item.slug),
        children: item.children?.map(child => ({
            ...child,
            exists: routeExists(child.slug)
        })) || []
    }))
)

const { currentTheme } = useTheme()
const iconDefault = "solar"
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
                            <Icon :name="iconDefault + ':' + item.icon" size="24" v-if="item.children.length <= 0" />
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
                                    <Icon :name="iconDefault + ':' + child.icon" size="20" />
                                    <span>{{ child.name }}</span>
                                </component>
                            </template>

                        </div>

                    </template>

                </nav>
            </div>

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