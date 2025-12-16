
export const useProfile = () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  return {
    user
  }
}