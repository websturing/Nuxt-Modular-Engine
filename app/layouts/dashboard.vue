<script setup lang="ts">
/**
 * Dashboard Layout
 * Layout dengan header dan sidebar untuk admin panel
 */

// Sidebar state
const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)

// Toggle sidebar
function toggleSidebar() {
    if (window.innerWidth < 1024) {
        isMobileSidebarOpen.value = !isMobileSidebarOpen.value
    } else {
        isSidebarCollapsed.value = !isSidebarCollapsed.value
    }
}

// Close mobile sidebar
function closeMobileSidebar() {
    isMobileSidebarOpen.value = false
}

// Close mobile sidebar on route change
const route = useRoute()
watch(() => route.path, () => {
    isMobileSidebarOpen.value = false
})

// Handle resize
onMounted(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            isMobileSidebarOpen.value = false
        }
    }
    window.addEventListener('resize', handleResize)
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
})
</script>

<template>
    <div>
        Dashboard
    </div>
</template>
