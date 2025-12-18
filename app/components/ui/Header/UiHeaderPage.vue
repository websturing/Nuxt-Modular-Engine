<script setup lang="ts"></script>

<template>
    <div class="space-y-1 sticky top-5 backdrop-blur-lg">
        <UiBreadcrumb :items="[{ label: 'Permission Management' }]" />

        <div class="flex items-center justify-between">
            <div>
                <p class="text-xl font-bold text-gray-800">Permission Management 1 </p>
                <p>Define and manage user roles, granular access levels, and organizational security policies
                    efficiently
                </p>
            </div>
            <UiButton icon="heroicons:plus" label="Add Role" />
        </div>
    </div>
</template>