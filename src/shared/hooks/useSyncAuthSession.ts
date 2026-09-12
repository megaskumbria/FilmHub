"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSyncAuthSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    void queryClient.invalidateQueries({ queryKey: ["collection"] });
    void queryClient.invalidateQueries({ queryKey: ["media-collection"] });
    router.refresh();
  };
};
