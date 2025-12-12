<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui';
</script>

<template>
    <div class="pt-2 pr-2 flex items-center justify-between">
        <div></div>
        <div class="">
            <AvatarRoot
                class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarImage class="h-full w-full rounded-[inherit] object-cover"
                    src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                    alt="Colm Tuite" />
                <AvatarFallback
                    class="text-grass11 dark:text-stone-300 leading-1 flex h-full w-full items-center justify-center bg-white dark:bg-stone-800 text-sm font-medium"
                    :delay-ms="600">
                    CT
                </AvatarFallback>
            </AvatarRoot>
        </div>

    </div>
</template>