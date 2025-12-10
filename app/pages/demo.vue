<script setup lang="ts">
/**
 * Demo Page - Showcase semua UI components
 */

definePageMeta({
    layout: 'admin',
})

// Form state
const formData = reactive({
    firstName: '',
    lastName: '',
    email: '',
})

// Dialog state
const isDialogOpen = ref(false)
const isConfirmDialogOpen = ref(false)

// Loading state
const isSubmitting = ref(false)

// Demo submit
async function handleSubmit() {
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    isSubmitting.value = false
    isDialogOpen.value = false
}
</script>

<template>
    <div>
        demo
    </div>
</template>
