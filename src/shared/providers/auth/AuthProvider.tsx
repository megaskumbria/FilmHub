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
      setUser(initialUser);
    } else {
      setUser({
        id: null,
        email: null,
        nickname: null,
        avatarUrl: null,
        language: "en",
        followersCount: 0,
        followsCount: 0,
      });
    }
    setHasHydrated(true);
  }, [initialUser, setUser, setHasHydrated]);

  return <>{children}</>;
};
