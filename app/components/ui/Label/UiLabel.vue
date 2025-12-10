<script setup lang="ts">
import { Label } from 'reka-ui';

/**
 * UiLabel - Enterprise-grade Label Component
 * Wrapper untuk Reka UI Label dengan required indicator
 */

interface Props {
    for?: string
    required?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
})

const labelClasses = computed(() => [
    'text-sm font-medium leading-none',
    props.disabled
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-700 dark:text-gray-200',
])
</script>

<template>
    <Label :for="props.for" :class="labelClasses">
        <slot />
        <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </Label>
</template>
