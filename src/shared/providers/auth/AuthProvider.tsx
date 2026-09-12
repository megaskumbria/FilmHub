"use client";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/features/auth/model/auth.store";

interface User {
  sub: string;
  email: string;
  username: string;
}

interface Props {
  children: ReactNode;
  initialUser: User | null;
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
