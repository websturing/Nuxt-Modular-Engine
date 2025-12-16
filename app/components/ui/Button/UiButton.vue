<script setup lang="ts">
/**
 * UiButton - Enterprise-grade Button Component
 * Wrapper untuk button dengan variants dan states
 */

interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    fullWidth?: boolean
    type?: 'button' | 'submit' | 'reset'
    icon?: string
    iconPos?: 'left' | 'right'
    iconClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    type: 'button',
    iconPos: 'left',
})

const iconSizeClasses = computed(() => {
    switch (props.size) {
        case 'sm': return 'h-4 w-4'
        case 'lg': return 'h-6 w-6'
        default: return 'h-5 w-5'
    }
})

const buttonClasses = computed(() => [
    // Base styles
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
    'transition-all duration-200 ease-in-out cursor-pointer',
    'disabled:cursor-not-allowed disabled:opacity-50',

    // Full width
    props.fullWidth && 'w-full',

    // Size variants
    {
        'px-3 py-1.5 text-sm': props.size === 'sm',
        'px-4 py-2.5 text-sm': props.size === 'md',
        'px-6 py-3 text-base': props.size === 'lg',
    },

    // Color variants
    {
        // Primary - Blue gradient
        'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg focus:ring-primary-500 text-secondary-200':
            props.variant === 'primary',

        // Secondary - Gray
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400':
            props.variant === 'secondary',

        // Outline
        'border border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50 focus:ring-primary-500':
            props.variant === 'outline',

        // Ghost
        'text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400':
            props.variant === 'ghost',

        // Danger
        'bg-gradient-to-r from-danger-500 to-danger-600 text-white hover:from-danger-600 hover:to-danger-700 text-secondary-200':
            props.variant === 'danger',
    },
])
</script>

<template>
    <button :type="type" :class="buttonClasses" :disabled="disabled || loading" v-bind="$attrs">
        <!-- Loading spinner -->
        <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>

        <Icon v-if="icon && iconPos === 'left' && !loading" :name="icon" :class="iconSizeClasses" />
        <slot />
        <Icon v-if="icon && iconPos === 'right' && !loading" :name="icon" :class="iconSizeClasses" />
    </button>
</template>
