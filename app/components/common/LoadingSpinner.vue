<script setup lang="ts">
/**
 * LoadingSpinner - Reusable loading indicator
 */

interface Props {
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'white' | 'gray'
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'primary',
})

const sizeClasses = computed(() => ({
    'h-4 w-4': props.size === 'sm',
    'h-6 w-6': props.size === 'md',
    'h-8 w-8': props.size === 'lg',
}))

const colorClasses = computed(() => ({
    'text-primary-600': props.color === 'primary',
    'text-white': props.color === 'white',
    'text-gray-400': props.color === 'gray',
}))
</script>

<template>
    <svg :class="['animate-spin', sizeClasses, colorClasses]" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
</template>
