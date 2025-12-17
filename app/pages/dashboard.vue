<template>
    <div>
        <h1>Dashboard {{ can('dashboard.read') }}</h1>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})
useSeoMeta({
    title: 'Dashboard'
})

const { can } = usePermission()
</script>