import { useAuthStore, useAuthModalStore } from "@/features/auth";

export const useRequireAuth = () => {
  const userId = useAuthStore((s) => s.user.id);
  const openAuthModal = useAuthModalStore((s) => s.open);

  return () => {
    if (!userId) {
      openAuthModal();
      return false;
    }
    return true;
  };
};
