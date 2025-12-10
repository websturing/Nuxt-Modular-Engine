<script setup lang="ts">
/**
 * UiCard - Enterprise-grade Card Component
 * Container dengan header, body, footer slots
 */

interface Props {
    variant?: 'default' | 'bordered' | 'elevated' | 'ghost'
    padding?: 'none' | 'sm' | 'md' | 'lg'
    hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    padding: 'md',
    hoverable: false,
})

const cardClasses = computed(() => [
    // Base
    'rounded-xl transition-all duration-200',

    // Variant styles
    {
        'bg-white border border-gray-200 shadow-sm': props.variant === 'default',
        'bg-white border-2 border-gray-300': props.variant === 'bordered',
        'bg-white shadow-lg border border-gray-100': props.variant === 'elevated',
        'bg-transparent': props.variant === 'ghost',
    },

    // Hoverable
    props.hoverable && props.variant !== 'ghost' &&
    'hover:shadow-md hover:border-gray-300 cursor-pointer',
])

const bodyClasses = computed(() => ({
    'p-0': props.padding === 'none',
    'p-3': props.padding === 'sm',
    'p-5': props.padding === 'md',
    'p-6': props.padding === 'lg',
}))
</script>

<template>
    <div :class="cardClasses">
        <!-- Header slot -->
        <div v-if="$slots.header" class="px-5 py-4 border-b border-gray-100">
            <slot name="header" />
        </div>

        <!-- Body/Default slot -->
        <div :class="bodyClasses">
            <slot />
        </div>

        <!-- Footer slot -->
        <div v-if="$slots.footer" class="px-5 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
            <slot name="footer" />
        </div>
    </div>
</template>
