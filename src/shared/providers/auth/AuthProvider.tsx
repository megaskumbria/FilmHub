"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore, type InitialUser } from "@/features/auth";

interface Props {
  children: ReactNode;
  initialUser: InitialUser | null;
}

export const AuthProvider = ({ children, initialUser }: Props) => {
  const { setUser } = useAuthStore();
  const { setHasHydrated } = useAuthStore();

  useEffect(() => {
    if (initialUser) {
      const { sub, email, username } = initialUser;
      setUser({ id: sub, email, username });
    } else {
      setUser({ username: null, email: null, id: null });
    }
    setHasHydrated(true);
  }, [initialUser, setUser, setHasHydrated]);

  return <>{children}</>;
};
