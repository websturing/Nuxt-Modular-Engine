<script setup lang="ts">
/**
 * UiInput - Enterprise-grade Input Component
 * Text input dengan variants, validation states, dan icons
 */

interface Props {
    modelValue?: string | number
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    error?: boolean
    success?: boolean
    size?: 'sm' | 'md' | 'lg'
    id?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    error: false,
    success: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    'blur': [event: FocusEvent]
    'focus': [event: FocusEvent]
}>()

const inputClasses = computed(() => [
    // Base styles
    'w-full rounded-lg border bg-white transition-all duration-200',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',

    // Size variants
    {
        'px-3 py-1.5 text-sm': props.size === 'sm',
        'px-4 py-2.5 text-sm': props.size === 'md',
        'px-4 py-3 text-base': props.size === 'lg',
    },

    // State variants
    props.error
        ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50'
        : props.success
            ? 'border-green-400 focus:ring-green-500/20 focus:border-green-500 bg-green-50/50'
            : 'border-gray-300 focus:ring-primary-500/20 focus:border-primary-500 hover:border-gray-400',

    // Disabled/Readonly state
    (props.disabled || props.readonly) && 'bg-gray-50 cursor-not-allowed opacity-60',
])

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <input :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
        :readonly="readonly" :class="inputClasses" @input="handleInput" @blur="emit('blur', $event)"
        @focus="emit('focus', $event)">
</template>
