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
    { threshold: 1.0 }
)
</script>

<template>
    <div class="relative group">
        <div ref="sentinel" class="absolute -top-[10px] left-0 right-0 h-[1px] pointer-events-none opacity-0"></div>

        <header class="sticky top-[100px] z-40 w-full transition-all duration-300 ease-in-out border-b" :class="[
            isStuck
                ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-sm py-4' // Saat Sticky (Agak transparan)
                : 'bg-white border-transparent py-6' // Saat Diam (Lebih lega paddingnya)
        ]">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="mb-2 transition-opacity duration-300" :class="{ 'opacity-0 h-0 overflow-hidden': isStuck }">
                    <UiBreadcrumb v-if="props.breadcrumbs" :items="props.breadcrumbs" />
                </div>

                <div class="flex items-center justify-between gap-4">
                    <div class="min-w-0 flex-1">
                        <h2 class="text-xl font-bold text-gray-900 sm:text-2xl truncate transition-all"
                            :class="{ 'text-lg': isStuck }">
                            {{ props.title }}
                        </h2>

                        <p v-if="props.description" class="text-sm text-gray-500 transition-all duration-300 origin-top"
                            :class="[isStuck ? 'scale-y-0 h-0 opacity-0' : 'scale-y-100 h-auto opacity-100 mt-1']">
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

        <div class="transition-all duration-300" :class="isStuck ? 'h-8' : 'h-0'"></div>
    </div>
</template>