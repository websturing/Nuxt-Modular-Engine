<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';

const fileInput = ref<HTMLInputElement | null>(null);

const handleImageClick = () => {
    fileInput.value?.click();
}

const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        console.log('Selected file:', file);
        // Here you would typically upload the file or update a local preview
    }
}
</script>

<template>
    <div class="relative group inline-block">
        <AvatarRoot
            class="bg-blackA3 inline-flex h-24 w-24 select-none items-center justify-center overflow-hidden rounded-full align-middle shadow-lg ring-4 ring-gray-400 ring-white dark:ring-gray-800 transition-all duration-300 group-hover:ring-blue-100 dark:group-hover:ring-gray-700">
            <AvatarImage class="h-full w-full rounded-[inherit] object-cover bg-white"
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                alt="Profile Picture" />
            <AvatarFallback
                class="text-grass11 dark:text-stone-300 leading-1 flex h-full w-full items-center justify-center bg-white dark:bg-stone-800 text-sm font-medium"
                :delay-ms="600">
                CT
            </AvatarFallback>

            <!-- Modern Overlay on Hover -->
            <div @click="handleImageClick"
                class="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer z-10">
                <Icon name="solar:camera-add-bold" class="w-8 h-8 text-white mb-1 drop-shadow-md" />
                <span class="text-xs text-white font-medium tracking-wide drop-shadow-md">Change</span>
            </div>
        </AvatarRoot>

        <!-- Edit Badge (Visible on mobile/always) -->
        <button @click="handleImageClick"
            class="absolute bottom-0.5 right-0.5 bg-red-100 w-7 h-7 flex items-center justify-center cursor-pointer  hover:text-blue-700 text-white p-2 rounded-full transition-transform active:scale-95 group-hover:scale-110 z-20">
            <Icon name="solar:pen-linear" class="w-6 h-6" />
        </button>

        <input type="file" ref="fileInput" class="hidden" accept="image/png, image/jpeg, image/jpg"
            @change="onFileChange" />
    </div>
</template>