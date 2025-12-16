export const useProfile = () => {

  const { user } = storeToRefs(useAuthStore())

  return {
    user
  }
}