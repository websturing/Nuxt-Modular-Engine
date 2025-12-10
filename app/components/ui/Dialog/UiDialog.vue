<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui'

/**
 * UiDialog - Enterprise-grade Dialog/Modal Component
 * Wrapper untuk Reka UI Dialog dengan styling dan animations
 * 
 * @example
 * <UiDialog v-model:open="isOpen">
 *   <template #trigger>
 *     <UiButton>Open Modal</UiButton>
 *   </template>
 *   
 *   <template #title>Modal Title</template>
 *   <template #description>Optional description</template>
 *   
 *   <!-- Default slot for content -->
 *   <p>Modal body content here...</p>
 *   
 *   <template #footer>
 *     <UiButton variant="secondary">Cancel</UiButton>
 *     <UiButton>Confirm</UiButton>
 *   </template>
 * </UiDialog>
 */

interface Props {
    open?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closeOnOverlay?: boolean
    showClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    size: 'md',
    closeOnOverlay: true,
    showClose: true,
})

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

// v-model support
const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value),
})

// Size classes for dialog content
const sizeClasses = computed(() => ({
    'max-w-sm': props.size === 'sm',
    'max-w-md': props.size === 'md',
    'max-w-lg': props.size === 'lg',
    'max-w-2xl': props.size === 'xl',
    'max-w-[90vw] max-h-[90vh]': props.size === 'full',
}))

function handleOverlayClick() {
    if (props.closeOnOverlay) {
        isOpen.value = false
    }
}
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <!-- Trigger slot -->
        <DialogTrigger v-if="$slots.trigger" as-child>
            <slot name="trigger" />
        </DialogTrigger>

        <DialogPortal>
            <!-- Overlay with animation -->
            <DialogOverlay
                class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                @click="handleOverlayClick" />

            <!-- Content with animation -->
            <DialogContent :class="[
                'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
                'w-full bg-white rounded-xl shadow-2xl border border-gray-200',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'duration-200',
                sizeClasses,
            ]" @pointer-down-outside="(e) => !closeOnOverlay && e.preventDefault()">
                <!-- Header -->
                <div class="flex items-start justify-between p-5 border-b border-gray-100">
                    <div class="space-y-1.5">
                        <DialogTitle class="text-lg font-semibold text-gray-900">
                            <slot name="title">Dialog Title</slot>
                        </DialogTitle>
                        <DialogDescription v-if="$slots.description" class="text-sm text-gray-500">
                            <slot name="description" />
                        </DialogDescription>
                    </div>

                    <!-- Close button -->
                    <DialogClose v-if="showClose"
                        class="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </DialogClose>
                </div>

                <!-- Body/Content -->
                <div class="p-5 max-h-[60vh] overflow-y-auto">
                    <slot />
                </div>

                <!-- Footer -->
                <div v-if="$slots.footer"
                    class="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                    <slot name="footer" />
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>