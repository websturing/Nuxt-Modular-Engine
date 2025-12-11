<script setup lang="ts">

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

const sidebarOpen = ref(false)
const router = useRouter()

const routeExists = (name: string) => {
    return router.getRoutes().some(r => r.name === name)
}

const menu: MenuItem[] = [
    {
        id: 1,
        name: "Dashboard",
        slug: "dashboard",
        icon: "SmartHome",
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
                icon: "BorderLeft24Filled",
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
                icon: "ChartPerson20Filled",
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
                icon: "QrCodeScannerSharp",
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
                icon: "Scan",
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
                icon: "CheckboxWarning20Regular",
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
        icon: "BrandAirtable",
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
                icon: "InsightsRound",
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
                icon: "Forms",
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
                icon: "DesignIdeas20Filled",
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
</script>

<template>
    <aside :class="[
        'fixed top-0 left-0 bottom-0 w-64 z-10 transition-transform duration-300',
        'h-[calc(100vh-0.5rem)]',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
    ]">

        <div class="bg-sidebar-bg text-primary-50 h-full flex flex-col overflow-hidden m-1 rounded-lg p-1">

            <!-- TITLE -->
            <div class="text-center my-5 text-lg font-semibold tracking-wide">
                Sewing Application
            </div>

            <!-- MENU -->
            <div class="flex-1 overflow-y-auto p-2">
                <nav class="space-y-1">

                    <template v-for="item in processedMenu" :key="item.slug">

                        <!-- === LEVEL 1 === -->
                        <component :is="item.exists ? NuxtLink : 'div'"
                            :to="item.exists ? { name: item.slug } : undefined" :class="[
                                'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200',
                                item.exists
                                    ? 'hover:bg-white/10 hover:text-white'
                                    : 'opacity-50 cursor-not-allowed',
                                $route.name === item.slug && item.exists
                                    ? 'router-active'
                                    : 'router-inactive'
                            ]">
                            <UiIcon :name="item.icon" size="20" />
                            <span>{{ item.name }}</span>
                        </component>

                        <!-- === CHILDREN === -->
                        <div v-if="item.children.length" class="pl-5 space-y-1 mt-1">

                            <template v-for="child in item.children" :key="child.slug">
                                <component :is="child.exists ? NuxtLink : 'div'"
                                    :to="child.exists ? { name: child.slug } : undefined" :class="[
                                        'flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200',
                                        child.exists
                                            ? 'hover:bg-white/10 hover:text-white'
                                            : 'opacity-50 cursor-not-allowed',
                                        $route.name === child.slug && child.exists
                                            ? 'router-active'
                                            : 'router-inactive'
                                    ]">
                                    <UiIcon :name="child.icon" size="18" />
                                    <span>{{ child.name }}</span>
                                </component>
                            </template>

                        </div>

                    </template>

                </nav>
            </div>

            <!-- FOOTER -->
            <div class="p-2 text-center text-xs text-gray-500">
                &copy; 2024
            </div>

        </div>
    </aside>
</template>
