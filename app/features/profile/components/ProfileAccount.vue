<script setup lang="ts">
const { user } = useProfile()
</script>

<template>
    <div class="flex flex-col gap-1">
        <p class="font-medium text-lg">{{ user?.name }}</p>
        <div class="flex gap-2">
            <p v-for="role in user?.roleNames" :key="role"
                class="bg-green-400 text-primary-600 px-2 py-0.5 rounded flex flex-inline">{{
                    role }}</p>
        </div>


        <p class="text-gray-500">{{ user?.email }}</p>
    </div>
</template>