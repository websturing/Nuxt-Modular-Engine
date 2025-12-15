<script setup lang="ts">
import { Icon } from '#components';
import {
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastViewport
} from 'reka-ui';
import { useToast } from './useToast';

const { toasts, remove } = useToast()

const handleOpenChange = (isOpen: boolean, id: string) => {
    if (!isOpen) {
        // Delay 300ms (sedikit lebih lama dari durasi animasi 200ms)
        setTimeout(() => {
            remove(id)
        }, 300)
    }
}
</script>

<template>
    <ToastProvider>
        <ToastRoot v-for="toast in toasts" :key="toast.id" :duration="toast.duration"
            @update:open="(isOpen: boolean) => handleOpenChange(isOpen, toast.id)" class="group  backdrop-blur-md fixed bg-white w-full border border-gray-200 pointer-events-auto shadow-lg flex items-start gap-3 p-4 pr-8 rounded-lg shadow-sm border transition-all 
      data-[state=open]:animate-slideInFromTop 
      data-[state=closed]:animate-slideOutToTop" :class="[
        // 1. VARIAN DEFAULT (TRANSPARAN / GLASSMORMISM)
        // Kita pakai backdrop-blur-md dan opacity pada background
        toast.variant === 'default'
            ? ''
            : '',

        // 2. VARIAN SUCCESS (Solid / Tinted Green)
        toast.variant === 'success'
            ? 'border-green-500 text-primary-700'
            : '',

        // 3. VARIAN DANGER (Solid / Tinted Red)
        toast.variant === 'danger'
            ? 'bg-red-50 border-red-300 text-red-700'
            : ''
    ]">
            <div class="mt-0.5 shrink-0">
                <Icon v-if="toast.variant === 'success'" name="lucide:check-circle-2" class="w-5 h-5 text-green-600" />

                <Icon v-else-if="toast.variant === 'danger'" name="lucide:alert-circle"
                    class="w-5 h-5 text-danger-600" />

                <Icon v-else name="lucide:loader-2" class="w-5 h-5 text-black-500 animate-spin" />
            </div>

            <div class="grid gap-1">
                <ToastTitle v-if="toast.title" class="text-sm font-semibold leading-none">
                    {{ toast.title }}
                </ToastTitle>
                <ToastDescription v-if="toast.description" class="text-sm opacity-90">
                    {{ toast.description }}
                </ToastDescription>
            </div>

            <ToastClose
                class="absolute right-2 top-2 p-1 rounded-md text-black-400/70 hover:text-black-900 hover:bg-black-100/50 transition-colors">
                <Icon name="lucide:x" class="w-4 h-4" />
            </ToastClose>
        </ToastRoot>

        <ToastViewport
            class="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px] gap-2" />
    </ToastProvider>
</template>