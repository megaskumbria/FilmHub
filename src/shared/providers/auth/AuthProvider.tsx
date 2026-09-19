"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore, User } from "@/features/auth";

interface Props {
  children: ReactNode;
  initialUser: User | null;
}

export const AuthProvider = ({ children, initialUser }: Props) => {
  const { setUser, setHasHydrated } = useAuthStore();

  useEffect(() => {
    if (initialUser) {
      const { id, email, nickname, avatarUrl } = initialUser;
      setUser({ id, email, nickname, avatarUrl });
    } else {
      setUser({ id: null, email: null, nickname: null, avatarUrl: null });
    }
    setHasHydrated(true);
  }, [initialUser, setUser, setHasHydrated]);

  return <>{children}</>;
};
