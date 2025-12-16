import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ProfileFormSchema, type ProfileForm } from '../schemas/profile.schema';

export const useProfileForm = () => {
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    const form = useForm<ProfileForm>({
        validationSchema: toTypedSchema(ProfileFormSchema),
        initialValues: {
            name: user.value?.name ?? '',
            email: user.value?.email ?? '',
        },
    })

    watch(user, (newUser) => {
        if (newUser) {
            form.setValues({
                name: newUser.name ?? '',
                email: newUser.email ?? '',
            })
        }
    }, { immediate: true })

    // 3. Update Action
    const isLoading = ref(false)
    const updateProfile = form.handleSubmit(async (values) => {
        isLoading.value = true
        try {
            const { error } = await useApi('/auth/profile', {
                method: 'PUT',
                body: values
            })

            if (error.value) {
                throw error.value
            }

            console.log('Profile updated', values)
        } catch (error) {
            console.error('Failed to update profile', error)
            // Handle error (set form errors, show toast, etc)
            // If it's a validation error from backend, we can set it to form
            // form.setErrors(error.data.errors)
        } finally {
            isLoading.value = false
        }
    })


    return {
        user,
        form,
        updateProfile,
        isLoading
    }
}