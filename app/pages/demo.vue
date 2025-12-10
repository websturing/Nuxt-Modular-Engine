<script setup lang="ts">
/**
 * Demo Page - Showcase semua UI components
 */

// Form state
const formData = reactive({
    firstName: '',
    lastName: '',
    email: '',
})

// Dialog state
const isDialogOpen = ref(false)
const isConfirmDialogOpen = ref(false)

// Loading state
const isSubmitting = ref(false)

// Demo submit
async function handleSubmit() {
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    isSubmitting.value = false
    isDialogOpen.value = false
}
</script>

<template>
    <div>
        <NuxtLayout>
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">
                    UI Components Demo
                </h1>
                <p class="text-gray-600">
                    Showcase of all available UI components built with Reka UI + Tailwind CSS
                </p>
            </div>

            <div class="grid gap-8">
                <!-- ========== BUTTONS SECTION ========== -->
                <UiCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-gray-900">Buttons</h2>
                    </template>

                    <div class="space-y-6">
                        <!-- Variants -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-700 mb-3">Variants</h3>
                            <div class="flex flex-wrap gap-3">
                                <UiButton variant="primary">Primary</UiButton>
                                <UiButton variant="secondary">Secondary</UiButton>
                                <UiButton variant="outline">Outline</UiButton>
                                <UiButton variant="ghost">Ghost</UiButton>
                                <UiButton variant="danger">Danger</UiButton>
                            </div>
                        </div>

                        <!-- Sizes -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-700 mb-3">Sizes</h3>
                            <div class="flex flex-wrap items-center gap-3">
                                <UiButton size="sm">Small</UiButton>
                                <UiButton size="md">Medium</UiButton>
                                <UiButton size="lg">Large</UiButton>
                            </div>
                        </div>

                        <!-- States -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-700 mb-3">States</h3>
                            <div class="flex flex-wrap gap-3">
                                <UiButton :loading="true">Loading...</UiButton>
                                <UiButton :disabled="true">Disabled</UiButton>
                                <UiButton full-width>Full Width Button</UiButton>
                            </div>
                        </div>
                    </div>
                </UiCard>

                <!-- ========== INPUTS SECTION ========== -->
                <UiCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-gray-900">Form Inputs</h2>
                    </template>

                    <div class="grid gap-6 md:grid-cols-2">
                        <!-- Default Input -->
                        <div class="space-y-2">
                            <UiLabel for="demo-default">Default Input</UiLabel>
                            <UiInput id="demo-default" v-model="formData.firstName" placeholder="Enter your name..." />
                        </div>

                        <!-- Required Input -->
                        <div class="space-y-2">
                            <UiLabel for="demo-required" required>Required Field</UiLabel>
                            <UiInput id="demo-required" v-model="formData.lastName"
                                placeholder="This field is required" />
                        </div>

                        <!-- Error State -->
                        <div class="space-y-2">
                            <UiLabel for="demo-error">Error State</UiLabel>
                            <UiInput id="demo-error" :error="true" placeholder="Something went wrong..." />
                            <p class="text-sm text-red-500">This field has an error</p>
                        </div>

                        <!-- Success State -->
                        <div class="space-y-2">
                            <UiLabel for="demo-success">Success State</UiLabel>
                            <UiInput id="demo-success" :success="true" model-value="Valid input" />
                            <p class="text-sm text-green-600">Looks good!</p>
                        </div>

                        <!-- Disabled Input -->
                        <div class="space-y-2">
                            <UiLabel for="demo-disabled" disabled>Disabled Input</UiLabel>
                            <UiInput id="demo-disabled" :disabled="true" model-value="Cannot edit this" />
                        </div>

                        <!-- Size Variants -->
                        <div class="space-y-2">
                            <UiLabel>Size Variants</UiLabel>
                            <div class="space-y-2">
                                <UiInput size="sm" placeholder="Small input" />
                                <UiInput size="md" placeholder="Medium input" />
                                <UiInput size="lg" placeholder="Large input" />
                            </div>
                        </div>
                    </div>
                </UiCard>

                <!-- ========== CARDS SECTION ========== -->
                <UiCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-gray-900">Cards</h2>
                    </template>

                    <div class="grid gap-4 md:grid-cols-3">
                        <UiCard variant="default">
                            <h3 class="font-medium mb-2">Default Card</h3>
                            <p class="text-sm text-gray-600">Standard card with shadow</p>
                        </UiCard>

                        <UiCard variant="bordered">
                            <h3 class="font-medium mb-2">Bordered Card</h3>
                            <p class="text-sm text-gray-600">Card with thicker border</p>
                        </UiCard>

                        <UiCard variant="elevated" hoverable>
                            <h3 class="font-medium mb-2">Elevated & Hoverable</h3>
                            <p class="text-sm text-gray-600">Hover me for effect!</p>
                        </UiCard>
                    </div>
                </UiCard>

                <!-- ========== DIALOG SECTION ========== -->
                <UiCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-gray-900">Dialog / Modal</h2>
                    </template>

                    <div class="flex flex-wrap gap-3">
                        <!-- Basic Dialog -->
                        <UiDialog v-model:open="isDialogOpen" size="md">
                            <template #trigger>
                                <UiButton>Open Dialog</UiButton>
                            </template>

                            <template #title>Create New Item</template>
                            <template #description>Fill in the details below to create a new item.</template>

                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <UiLabel for="dialog-name" required>Name</UiLabel>
                                    <UiInput id="dialog-name" placeholder="Enter item name" />
                                </div>
                                <div class="space-y-2">
                                    <UiLabel for="dialog-email" required>Email</UiLabel>
                                    <UiInput id="dialog-email" type="email" placeholder="Enter email" />
                                </div>
                            </div>

                            <template #footer>
                                <UiButton variant="ghost" @click="isDialogOpen = false">Cancel</UiButton>
                                <UiButton :loading="isSubmitting" @click="handleSubmit">
                                    Save Changes
                                </UiButton>
                            </template>
                        </UiDialog>

                        <!-- Confirmation Dialog -->
                        <UiDialog v-model:open="isConfirmDialogOpen" size="sm">
                            <template #trigger>
                                <UiButton variant="danger">Delete Item</UiButton>
                            </template>

                            <template #title>Confirm Delete</template>
                            <template #description>
                                Are you sure you want to delete this item? This action cannot be undone.
                            </template>

                            <template #footer>
                                <UiButton variant="ghost" @click="isConfirmDialogOpen = false">Cancel</UiButton>
                                <UiButton variant="danger" @click="isConfirmDialogOpen = false">
                                    Yes, Delete
                                </UiButton>
                            </template>
                        </UiDialog>

                        <!-- Large Dialog -->
                        <UiDialog size="lg">
                            <template #trigger>
                                <UiButton variant="outline">Large Dialog</UiButton>
                            </template>

                            <template #title>Large Content Dialog</template>

                            <div class="prose prose-sm max-w-none">
                                <p>
                                    This is a larger dialog that can contain more content.
                                    It's useful for forms with many fields or displaying detailed information.
                                </p>
                                <p>
                                    The dialog automatically handles scrolling when content exceeds the maximum height.
                                </p>
                            </div>
                        </UiDialog>
                    </div>
                </UiCard>

                <!-- ========== COMMON COMPONENTS ========== -->
                <UiCard>
                    <template #header>
                        <h2 class="text-lg font-semibold text-gray-900">Common Components</h2>
                    </template>

                    <div class="grid gap-6 md:grid-cols-2">
                        <!-- Loading Spinners -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-700 mb-3">Loading Spinners</h3>
                            <div class="flex items-center gap-4">
                                <LoadingSpinner size="sm" />
                                <LoadingSpinner size="md" />
                                <LoadingSpinner size="lg" />
                                <div class="bg-primary-600 p-3 rounded-lg">
                                    <LoadingSpinner color="white" />
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div>
                            <h3 class="text-sm font-medium text-gray-700 mb-3">Empty State</h3>
                            <UiCard variant="bordered" padding="none">
                                <EmptyState title="No products found"
                                    description="Try adjusting your search or filter criteria." icon="search">
                                    <template #action>
                                        <UiButton size="sm">Clear Filters</UiButton>
                                    </template>
                                </EmptyState>
                            </UiCard>
                        </div>
                    </div>
                </UiCard>
            </div>
        </NuxtLayout>
    </div>
</template>
