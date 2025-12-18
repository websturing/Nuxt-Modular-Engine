<script setup lang="ts">
import {
    ScrollAreaCorner,
    ScrollAreaRoot,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
} from 'reka-ui'

interface Props {
    orientation?: 'vertical' | 'horizontal'
    maxHeight?: string | number
    height?: string | number
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    orientation: 'vertical',
    maxHeight: undefined,
    height: '100%'
})

const computedStyle = computed(() => {
    const style: Record<string, string | number> = {}
    if (props.height) style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    if (props.maxHeight) style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    return style
})
</script>

<template>
    <ScrollAreaRoot :class="['scroll-area-root relative overflow-hidden', props.class]" :style="computedStyle"
        :type="'hover'">
        <ScrollAreaViewport class="w-full h-full rounded-[inherit] outline-none">
            <slot />
        </ScrollAreaViewport>

        <ScrollAreaScrollbar
            class="
        flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-gray-100/50 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 z-50"
            :orientation="props.orientation">
            <ScrollAreaThumb class="
          flex-1 bg-gray-300 rounded-[10px] relative 
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]
          hover:bg-gray-400 transition-colors" />
        </ScrollAreaScrollbar>

        <!-- Second scrollbar for horizontal if needed (reka-ui allows multiple) -->
        <ScrollAreaScrollbar v-if="props.orientation === 'horizontal'"
            class="
        flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-gray-100/50 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 z-50"
            orientation="horizontal">
            <ScrollAreaThumb class="flex-1 bg-gray-300 rounded-[10px] hover:bg-gray-400 transition-colors" />
        </ScrollAreaScrollbar>

        <ScrollAreaCorner class="bg-black/5" />
    </ScrollAreaRoot>
</template>

<style scoped>
/* Ensure ScrollArea takes up space correctly */
.scroll-area-root {
    --scrollbar-size: 10px;
}
</style>
