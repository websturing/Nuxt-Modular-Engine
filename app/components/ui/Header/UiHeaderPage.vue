<script setup lang="ts">
// Import type jika belum auto-import
import { ref } from 'vue';

interface Props {
    title: string;
    description?: string;
    breadcrumbs?: { label: string, to?: string }[]; // Update tipe breadcrumb biar bisa diklik
}

const props = defineProps<Props>();

// 1. BEST PRACTICE TS: Definisikan tipe elemen HTML
const sentinel = ref<HTMLDivElement | null>(null)
const isStuck = ref(false)

useIntersectionObserver(
    sentinel,
    (entries) => {
        const entry = entries[0]
        // Tambahkan '?' (optional chaining) atau check if(entry)
        // Jika entry ada, ambil isIntersecting. Jika undefined, default ke false (biar aman).
        isStuck.value = !entry?.isIntersecting
    },
    { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
)
</script>

<template>
    <div ref="sentinel" class="w-full h-[1px] pointer-events-none opacity-0"></div>

    <header class="sticky top-0 z-40 w-full transition-all duration-300 ease-in-out border-b" :class="[
        isStuck
            ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-sm py-4' // Saat Sticky (Agak transparan)
            : 'bg-white border-transparent ' // Saat Diam (Lebih lega paddingnya)
    ]">
        <div class="">
            <div class="mb-2 transition-opacity duration-300" :class="{ 'opacity-0 h-0 overflow-hidden': isStuck }">
                <UiBreadcrumb v-if="props.breadcrumbs" :items="props.breadcrumbs" />
            </div>

            <div class="flex items-center justify-between gap-4">
                <div class="min-w-0 flex-1">
                    <h2 class="text-xl font-bold text-gray-900 sm:text-2xl truncate transition-all">
                        {{ props.title }}
                    </h2>

                    <p v-if="props.description" class="text-sm text-gray-500 transition-all duration-300 origin-top">
                        {{ props.description }}
                    </p>
                </div>

                <div class="flex-shrink-0">
                    <slot name="actions">
                        <UiButton icon="heroicons:plus" label="Add New" variant="primary" />
                    </slot>
                </div>
            </div>
        </div>
    </header>

    <div class="transition-all duration-300" :class="isStuck ? 'h-0' : 'h-0'"></div>
</template>