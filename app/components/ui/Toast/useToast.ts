import { ref } from 'vue'

export interface ToastProps {
    id: string
    title?: string
    description?: string
    variant?: 'default' | 'success' | 'danger' | 'loading' // Tambahkan loading jika mau styling khusus
    duration?: number
}

const toasts = ref<ToastProps[]>([])

export const useToast = () => {
    // 1. Ubah add agar me-return ID
    const add = (payload: Omit<ToastProps, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9)
        const newToast: ToastProps = {
            id,
            duration: 3000,
            variant: 'default',
            ...payload,
        }
        toasts.value.push(newToast)

        return id
    }

    const update = (id: string, payload: Partial<Omit<ToastProps, 'id'>>) => {
        const index = toasts.value.findIndex((t) => t.id === id)

        const item = toasts.value[index]
        if (index !== -1 && item) {
            toasts.value[index] = { ...item, ...payload }
        }
    }

    const remove = (id: string) => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
    }

    return { toasts, add, remove, update }
}