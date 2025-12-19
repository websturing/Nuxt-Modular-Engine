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
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <div class="relative w-64">
                <UiInput v-model="model" placeholder="Search..." leading-icon="heroicons:magnifying-glass" size="sm">
                    <template #suffix v-if="model">
                        <button type="button" class="text-gray-400 hover:text-gray-600 focus:outline-none"
                            @click="model = ''">
                            <Icon name="solar:close-circle-broken" class="h-4 w-4" />
                        </button>
                    </template>
                </UiInput>
            </div>
            <slot name="end" />
        </div>
        <div class="flex items-center gap-2">
            <slot name="start" />
        </div>
    </div>
</template>