<script setup lang="ts">
const { user, form, updateProfile, isLoading } = useProfileForm()

// Define fields for binding
const [name, nameAttrs] = form.defineField('name');
const [email, emailAttrs] = form.defineField('email');

const isEdit = ref(false)

const buttonClasses = computed<{
    icon: string
    text: string
    variant: 'primary' | 'outline'
}>(() => {
    const isEditing = isEdit.value

    return {
        icon: isEditing ? 'solar:plain-2-broken' : 'solar:pen-new-square-linear',
        text: isEditing ? 'Save Changes' : 'Reset Password',
        variant: isEditing ? 'primary' : 'outline',
    }
})

const handleAccountAction = async () => {
    if (!isEdit.value) {
        isEdit.value = true
    } else {
        await updateProfile()
        if (form.meta.value.valid) {
            isEdit.value = false
        }
    }
}

</script>

<template>
    <div
        class="shadow-sm p-6 rounded-lg border border-gray-200 flex flex-col gap-6 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div class="flex justify-between items-center">
            <div
                class="flex gap-3 items-center text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <Icon name="solar:shield-check-broken" class="size-6" />
                </div>
                <div>
                    <h3 class="font-semibold text-lg leading-tight">Password & Security</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Update your password here.</p>
                </div>
            </div>

        </div>
        <form @submit.prevent="handleAccountAction" class="flex flex-col gap-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="space-y-1">
                    <UiInput id="name" label="Reset Password" v-model="name" v-bind="nameAttrs" :disabled="!isEdit"
                        :error="!!form.errors.value.name" placeholder="Enter your full name" />
                    <span v-if="form.errors.value.name" class="text-xs text-red-500 font-medium ml-1">{{
                        form.errors.value.name }}</span>
                </div>
                <div class="space-y-1">
                    <UiInput id="name" label="Confirm Password" v-model="name" v-bind="nameAttrs" :disabled="!isEdit"
                        :error="!!form.errors.value.name" placeholder="Enter your full name" />
                    <span v-if="form.errors.value.name" class="text-xs text-red-500 font-medium ml-1">{{
                        form.errors.value.name }}</span>
                </div>
            </div>
            <UiButton :icon="buttonClasses.icon" custom-class="!w-[200px]" icon-pos="right"
                :variant="buttonClasses.variant" :loading="isLoading" type="button" @click="handleAccountAction">
                {{ buttonClasses.text }}
            </UiButton>
        </form>
    </div>
</template>