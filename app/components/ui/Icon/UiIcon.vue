<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { getIcon } from '~/utils/icon-registry'

interface Props {
    name?: string
    size?: string | number
    color?: string
    depth?: number | string
}

const props = defineProps<Props>()

const resolvedIcon = ref<any>(null)

// Resolve icon name → actual component
const loadIcon = async () => {
    if (!props.name) {
        resolvedIcon.value = null
        return
    }

    const icon = await getIcon(props.name)
    resolvedIcon.value = icon
}

onMounted(loadIcon)
watch(() => props.name, loadIcon)

const styles = computed(() => {
    const s: Record<string, string> = {}

    if (props.size) {
        s.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
        s.width = '1em'
        s.height = '1em'
    }

    if (props.color) {
        s.color = props.color
    }

    return s
})
</script>

<template>
    <i class="ui-icon inline-flex items-center justify-center leading-none align-middle" :style="styles" role="img"
        v-bind="$attrs">
        <!-- If dynamic icon resolved -->
        <component :is="resolvedIcon" v-if="resolvedIcon" />

        <!-- Fallback to slot -->
        <slot v-else />
    </i>
</template>

<style scoped>
.ui-icon {
    :deep(svg) {
        height: 1em;
        width: 1em;
        fill: currentColor;
    }
}
</style>
