<script setup lang="ts">
const { user } = useProfile()


const isEdit = ref(false)

const buttonClasses = computed<{
    icon: string
    text: string
    variant: 'primary' | 'outline'
}>(() => {
    const isEditing = isEdit.value

    return {
        icon: 'solar:document-add-broken',
        text: isEditing ? 'Update' : 'Edit',
        variant: isEditing ? 'primary' : 'outline',
    }
})

</script>

<template>
    <div class="shadow-sm p-4 rounded-lg border border-gray-200 flex flex-col gap-5 bg-white-50">
        <div class="flex gap-2 items-center text-gray-600">
            <Icon name="solar:user-id-broken" class="size-8" />
            <p>Personal Account </p>
        </div>
        <form class="flex flex-col gap-5">
            <div class="flex gap-2">
                <UiInput label="Full Name" />
                <UiInput label="Email" />
            </div>
            <div>
                <UiButton :icon="buttonClasses.icon" icon-pos="right" :variant="buttonClasses.variant">{{
                    buttonClasses.text
                    }}</UiButton>
            </div>
        </form>
    </div>
</template>