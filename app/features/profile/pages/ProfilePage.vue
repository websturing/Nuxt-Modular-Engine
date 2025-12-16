<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
</script>

<template>
    <div class="flex flex-col gap-5">
        <div class="flex items-center gap-4">
            <profile-avatar />
            <profile-account />
        </div>
        <profile-account-form />
    </div>
</template>