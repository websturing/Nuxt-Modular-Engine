<script setup lang="ts">
const authStore = useAuthStore()

definePageMeta({
    layout: 'admin'
})

// Fetch fresh user data on page load
// This ensures the profile page has the latest data and triggers the loading indicator
await useAsyncData('me', () => authStore.fetchUser())
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center gap-4">
            <profile-avatar />
            <profile-account />
        </div>
        <profile-account-form />
        <profile-account-password-form />
    </div>
</template>