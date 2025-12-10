<script setup lang="ts">
import { getIcon } from '~/utils/icon-registry'

/**
 * UiIcon - Flexible Icon Wrapper Component
 * Wrapper untuk icon sets (seperti @vicons) dengan normalisasi sizing dan color.
 * Supports both slot usage and string-based lookup.
 * 
 * @example
 * // By Name (Auto-lookup)
 * <UiIcon name="Home" size="24" color="red" />
 * 
 * // By Slot (Import explicitly)
 * <UiIcon size="24" color="red">
 *   <Accessibility />
 * </UiIcon>
 */

interface Props {
    /**
     * Name of the icon to render (e.g., 'Home', 'Search', 'Menu').
     * If provided, UiIcon will search for this icon in the installed @vicons sets.
     */
    name?: string

    /**
     * Size of the icon. Can be a number (pixels) or string (css value like '2rem', '24px').
     * If not provided, it inherits font-size or defaults to 1em.
     */
    size?: string | number

    /**
     * Color of the icon.
     * If not provided, it inherits current text color (currentColor).
     */
    color?: string

    /**
     * Depth/Stroke width (if supported by the icon set)
     */
    depth?: number | string
}

const props = defineProps<Props>()

const styles = computed(() => {
    const s: Record<string, string> = {}

    if (props.size) {
        s.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
        // Ensure width/height adapt to font-size for typical svg icons
        s.width = '1em'
        s.height = '1em'
    }

    if (props.color) {
        s.color = props.color
    }

    return s
})

// Resolve the icon component if a name is provided
const iconComponent = computed(() => {
    if (props.name) {
        return getIcon(props.name)
    }
    return null
})
</script>

<template>
    <i class="ui-icon inline-flex items-center justify-center leading-none align-middle" :style="styles" role="img"
        v-bind="$attrs">
        <!-- Render by Name -->
        <component :is="iconComponent" v-if="iconComponent" />

        <!-- Render by Slot (Fallback) -->
        <slot v-else />
    </i>
</template>

<style scoped>
.ui-icon {

    /* Ensure internal SVGs inherit the size and color */
    :deep(svg) {
        height: 1em;
        width: 1em;
        fill: currentColor;
    }
}
</style>
