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

interface Props {
    open?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    closeOnOverlay?: boolean
    showClose?: boolean
    originX?: number
    originY?: number
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    size: 'md',
    closeOnOverlay: true,
    showClose: true,
    originX: 50,
    originY: 50,
})

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value),
})

const sizeClasses = computed(() => ({
    'max-w-sm': props.size === 'sm',
    'max-w-md': props.size === 'md',
    'max-w-lg': props.size === 'lg',
    'max-w-2xl': props.size === 'xl',
    'max-w-[90vw] max-h-[90vh]': props.size === 'full',
}))

// Hitung posisi awal dan akhir untuk animasi
const animationVars = computed(() => {
    // Posisi awal (dari button)
    const startX = props.originX
    const startY = props.originY

    // Posisi akhir (center)
    const endX = 50
    const endY = 50

    return {
        '--start-x': `${startX}vw`,
        '--start-y': `${startY}vh`,
        '--end-x': `${endX}vw`,
        '--end-y': `${endY}vh`,
    }
})

function handleOverlayClick() {
    if (props.closeOnOverlay) {
        isOpen.value = false
    }
}
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger v-if="$slots.trigger" as-child>
            <slot name="trigger" />
        </DialogTrigger>

        <DialogPortal>
            <DialogOverlay
                class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300"
                @click="handleOverlayClick" />

            <DialogContent :class="[
                'fixed z-50',
                'w-full bg-white rounded-xl shadow-2xl border border-gray-200',
                'dialog-content',
                sizeClasses,
            ]" :style="animationVars" @pointer-down-outside="(e) => !closeOnOverlay && e.preventDefault()">

                <div class="flex items-start justify-between p-5 border-b border-gray-100">
                    <div class="space-y-1.5">
                        <DialogTitle class="text-lg font-semibold text-gray-900">
                            <slot name="title">Dialog Title</slot>
                        </DialogTitle>
                        <DialogDescription v-if="$slots.description" class="text-sm text-gray-500">
                            <slot name="description" />
                        </DialogDescription>
                    </div>

                    <DialogClose v-if="showClose"
                        class="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </DialogClose>
                </div>

                <div class="p-5 max-h-[60vh] overflow-y-auto">
                    <slot />
                </div>

                <div v-if="$slots.footer"
                    class="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                    <slot name="footer" />
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped>
/* Animasi macOS-style: bergerak dari posisi button ke center */
@keyframes slide-zoom-in {
    0% {
        left: var(--start-x);
        top: var(--start-y);
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
    }

    100% {
        left: var(--end-x);
        top: var(--end-y);
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}

@keyframes slide-zoom-out {
    0% {
        left: var(--end-x);
        top: var(--end-y);
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    100% {
        left: var(--start-x);
        top: var(--start-y);
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
    }
}

.dialog-content[data-state="open"] {
    animation: slide-zoom-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    left: var(--end-x);
    top: var(--end-y);
    transform: translate(-50%, -50%);
}

.dialog-content[data-state="closed"] {
    animation: slide-zoom-out 0.25s cubic-bezier(0.5, 0, 0.75, 0);
    left: var(--start-x);
    top: var(--start-y);
    transform: translate(-50%, -50%) scale(0.3);
}
</style>