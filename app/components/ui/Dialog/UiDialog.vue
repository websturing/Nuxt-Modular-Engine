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
    title?: string // Shortcut prop untuk title
}

const props = withDefaults(defineProps<Props>(), {
    open: undefined, // Biarkan undefined agar bisa dikontrol via v-model atau internal
    size: 'md',
    closeOnOverlay: true,
    showClose: true,
    title: ''
})

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

// State internal untuk koordinat animasi
const triggerOrigin = ref({ x: 50, y: 50 })
// Menggunakan useVModel dari VueUse (jika ada) atau manual computed untuk support v-model
const isOpen = computed({
    get: () => props.open || false,
    set: (value) => emit('update:open', value),
})

const sizeClasses = computed(() => ({
    'max-w-sm': props.size === 'sm',
    'max-w-md': props.size === 'md',
    'max-w-lg': props.size === 'lg',
    'max-w-2xl': props.size === 'xl',
    'max-w-[95vw] max-h-[95vh] h-full': props.size === 'full',
}))

// Fungsi untuk menghitung posisi elemen pemicu
function calculateOrigin(el: HTMLElement | null) {
    if (el) {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        triggerOrigin.value = {
            x: (centerX / window.innerWidth) * 100,
            y: (centerY / window.innerHeight) * 100
        }
    } else {
        // Default ke tengah jika tidak ada elemen pemicu
        triggerOrigin.value = { x: 50, y: 50 }
    }
}

function handleTriggerClick(event: MouseEvent) {
    calculateOrigin(event.currentTarget as HTMLElement)
}

/**
 * PUBLIC METHOD: Open
 * Bisa dipanggil dari parent component via Template Ref
 * @param target Bisa berupa MouseEvent (klik) atau HTMLElement target
 */
function open(target?: MouseEvent | HTMLElement) {
    if (target) {
        if (target instanceof MouseEvent) {
            calculateOrigin(target.currentTarget as HTMLElement || target.target as HTMLElement)
        } else if (target instanceof HTMLElement) {
            calculateOrigin(target)
        }
    } else {
        // Reset ke tengah jika dipanggil tanpa target (open())
        triggerOrigin.value = { x: 50, y: 50 }
    }

    // Set state true (memicu v-model update juga jika di-bind)
    emit('update:open', true)
}

function close() {
    emit('update:open', false)
}

// Expose methods agar bisa dipakai parent
defineExpose({
    open,
    close
})

// CSS Variables untuk animasi dinamis
const animationVars = computed(() => {
    return {
        '--start-x': `${triggerOrigin.value.x}vw`,
        '--start-y': `${triggerOrigin.value.y}vh`,
        '--end-x': '50vw',
        '--end-y': '50vh',
    }
})

function handleOverlayClick() {
    if (props.closeOnOverlay) {
        close()
    }
}
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger v-if="$slots.trigger" as-child @click="handleTriggerClick">
            <slot name="trigger" />
        </DialogTrigger>

        <DialogPortal>
            <DialogOverlay class="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px] 
               data-[state=open]:animate-in data-[state=closed]:animate-out 
               data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" @click="handleOverlayClick" />

            <DialogContent :class="[
                'fixed z-[10000] left-[50%] top-[50%]',
                'w-full bg-white rounded-xl shadow-2xl border border-gray-100',
                'dialog-content outline-none',
                sizeClasses,
            ]" :style="animationVars" @pointer-down-outside="(e) => !closeOnOverlay && e.preventDefault()"
                @escape-key-down="(e) => !closeOnOverlay && e.preventDefault()">

                <div class="flex items-start justify-between px-6 py-5 border-b border-gray-100/50">
                    <div class="space-y-1">
                        <DialogTitle class="text-lg font-bold text-gray-900 leading-none">
                            <slot name="title">{{ title || 'Dialog Title' }}</slot>
                        </DialogTitle>

                        <DialogDescription v-if="$slots.description" class="text-sm text-gray-500">
                            <slot name="description" />
                        </DialogDescription>
                    </div>

                    <DialogClose v-if="showClose" @click="close"
                        class="rounded-full p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </DialogClose>
                </div>

                <div class="px-6 py-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <slot />
                </div>

                <div v-if="$slots.footer"
                    class="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 rounded-b-xl border-t border-gray-100">
                    <slot name="footer" />
                </div>

            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped>
/* Animasi macOS-style yang lebih smooth */
@keyframes slide-zoom-in {
    0% {
        left: var(--start-x);
        top: var(--start-y);
        transform: translate(-50%, -50%) scale(0.4);
        opacity: 0;
        filter: blur(8px);
    }

    100% {
        left: var(--end-x);
        top: var(--end-y);
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        filter: blur(0);
    }
}

@keyframes slide-zoom-out {
    0% {
        left: var(--end-x);
        top: var(--end-y);
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        filter: blur(0);
    }

    100% {
        left: var(--start-x);
        top: var(--start-y);
        transform: translate(-50%, -50%) scale(0.4);
        opacity: 0;
        filter: blur(8px);
    }
}

.dialog-content[data-state="open"] {
    animation: slide-zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.dialog-content[data-state="closed"] {
    animation: slide-zoom-out 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Custom Scrollbar agar lebih rapi di dalam dialog */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e5e7eb;
    border-radius: 20px;
}
</style>