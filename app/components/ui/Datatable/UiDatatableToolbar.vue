<script setup lang="ts">
const props = defineProps<{
    modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const model = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})
</script>

<template>
    <div class="flex items-center justify-between pb-4">
        <div class="flex items-center gap-2">
            <slot name="start" />
        </div>

        <div class="flex items-center gap-2">
            <div class="relative w-64">
                <UiInput v-model="model" placeholder="Search..." leading-icon="heroicons:magnifying-glass" size="sm" />
            </div>
            <slot name="end" />
        </div>
    </div>
</template>