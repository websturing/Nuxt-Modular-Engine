<script setup lang="ts">
import {
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuTrigger
} from 'reka-ui';

interface Props {
    label: string
    icon?: string       // Jadi opsional (?)
    avatar?: string     // Prop baru untuk URL gambar
    align?: 'start' | 'center' | 'end' // Opsional: biar posisi dropdown bisa diatur
}

// Default value
withDefaults(defineProps<Props>(), {
    icon: 'solar:user-circle-bold', // Default icon jika avatar & icon kosong
    align: 'end' // Default rata kanan (cocok untuk pojok kanan atas)
})
</script>

<template>
    <DropdownMenuRoot>
        <DropdownMenuTrigger as-child>
            <button
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors outline-none  border border-transparent">

                <div v-if="avatar" class="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shrink-0">
                    <img :src="avatar" :alt="label" class="w-full h-full object-cover" />
                </div>

                <Icon v-else :name="icon" class="w-6 h-6 text-gray-600" />

                <div class="flex flex-col text-left">
                    <span class="text-sm font-medium text-gray-700 leading-tight">
                        {{ label }}
                    </span>
                </div>

                <Icon name="solar:alt-arrow-down-bold" class="w-3 h-3 text-gray-400 ml-1" />
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
            <DropdownMenuContent :align="align" :side-offset="8"
                class="min-w-[200px] bg-white rounded-lg p-1 shadow-xl border border-gray-100 !z-[10000]  animate-in fade-in zoom-in-95 duration-200 origin-top-right">

                <slot />

            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>