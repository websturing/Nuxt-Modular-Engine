<script setup lang="ts">

definePageMeta({
    layout: 'admin',
})

const { can, test } = usePermission()

</script>

<template>
    <div class="text-secondary-50">
        index {{ test }}
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            + Tambah Widget
        </button>
    </div>
</template>
