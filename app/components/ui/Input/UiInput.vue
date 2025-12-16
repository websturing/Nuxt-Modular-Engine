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
    leadingIcon?: string
    trailingIcon?: string
    loading?: boolean
    label?: string
    labelPosition?: 'top' | 'left'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    error: false,
    success: false,
    loading: false,
    labelPosition: 'top',
})

const slots = useSlots()
const showPassword = ref(false)
const inputType = computed(() => {
    if (props.type === 'password' && showPassword.value) return 'text'
    return props.type
})

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const emit = defineEmits<{
    'update:modelValue': [value: string]
    'blur': [event: FocusEvent]
    'focus': [event: FocusEvent]
}>()

const inputClasses = computed(() => [
    // Base styles
    'w-full rounded-lg border bg-white transition-all duration-200',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-1 focus:ring-offset-0',

    {
        'py-1.5 text-sm': props.size === 'sm',
        'py-2.5 text-sm': props.size === 'md',
        'py-3 text-base': props.size === 'lg',

        // Horizontal padding based on icon/slot presence
        'pl-3': !props.leadingIcon && !slots.prefix,
        'pl-10': !!props.leadingIcon || !!slots.prefix,
        'pr-3': !props.trailingIcon && !props.loading && props.type !== 'password' && !slots.suffix,
        'pr-10': !!props.trailingIcon || !!props.loading || props.type === 'password' || !!slots.suffix,
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
    <div :class="[
        'w-full flex',
        labelPosition === 'left' ? 'flex-row items-center gap-3' : 'flex-col gap-1.5'
    ]">
        <label v-if="label" :for="id"
            class="text-sm font-medium text-gray-700 dark:text-gray-200 flex-shrink-0 cursor-pointer">
            {{ label }}
        </label>

        <div class="relative w-full">
            <!-- Leading / Prefix -->
            <div v-if="leadingIcon || $slots.prefix"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
                :class="{ 'pointer-events-none': !slots.prefix }">
                <slot name="prefix">
                    <Icon v-if="leadingIcon" :name="leadingIcon" class="h-5 w-5" />
                </slot>
            </div>

            <input :id="id" :type="inputType" :value="modelValue" :placeholder="placeholder"
                :disabled="disabled || loading" :readonly="readonly" :class="inputClasses" v-bind="$attrs"
                @input="handleInput" @blur="emit('blur', $event)" @focus="emit('focus', $event)">

            <!-- Right Side Actions (Loading, Password Toggle, or Trailing Icon) -->
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <slot name="suffix">
                    <!-- Loading -->
                    <Icon v-if="loading" name="eos-icons:loading" class="h-5 w-5 animate-spin text-primary-500" />

                    <!-- Password Toggle -->
                    <button v-else-if="type === 'password'" type="button" tabindex="-1"
                        class="flex focus:outline-none text-gray-400 hover:text-gray-600 transition-colors"
                        @click="togglePassword">
                        <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="h-5 w-5" />
                    </button>

                    <!-- Trailing Icon (only if not loading and not password) -->
                    <div v-else-if="trailingIcon" class="flex items-center text-gray-400 pointer-events-none">
                        <Icon :name="trailingIcon" class="h-5 w-5" />
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
