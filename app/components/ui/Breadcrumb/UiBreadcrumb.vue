<script setup lang="ts">
/**
 * UiBreadcrumb - Enterprise-grade Breadcrumb Component
 * Automatically generates breadcrumbs from route or accepts manual items.
 */

interface BreadcrumbItem {
    label: string
    to?: string
    icon?: string
}

interface Props {
    items?: BreadcrumbItem[]
    homeLabel?: string
    separatorIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
    items: undefined,
    homeLabel: 'Home',
    separatorIcon: 'heroicons:chevron-right-20-solid'
})

const route = useRoute()

const breadcrumbs = computed(() => {
    if (props.items && props.items.length > 0) {
        return props.items
    }

    const path = route.path
    const segments = path.split('/').filter(Boolean)

    // Generate crumbs
    const crumbs = segments.map((segment, index) => {
        const to = '/' + segments.slice(0, index + 1).join('/')

        // Format label: "acl" -> "Acl", "user-profile" -> "User Profile"
        const label = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

        return {
            label,
            // Disable link for the last item (current page)
            to: index === segments.length - 1 ? undefined : to
        }
    })

    return crumbs
})
</script>

<template>
    <nav class="flex " aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <!-- Home Item -->
            <li class="inline-flex items-center">
                <NuxtLink to="/"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                    <Icon name="heroicons:home" class="w-4 h-4 me-2.5" />
                    {{ homeLabel }}
                </NuxtLink>
            </li>

            <!-- Dynamic Items -->
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <div class="flex items-center">
                    <Icon :name="separatorIcon" class="rtl:rotate-180 w-5 h-5 text-gray-400 mx-1" />

                    <span v-if="!crumb.to"
                        class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 cursor-default">
                        {{ crumb.label }}
                    </span>

                    <NuxtLink v-else :to="crumb.to"
                        class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2 dark:text-gray-400 dark:hover:text-white transition-colors">
                        {{ crumb.label }}
                    </NuxtLink>
                </div>
            </li>
        </ol>
    </nav>
</template>
