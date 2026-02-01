"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/shared/ui";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Button onClick={() => setTheme(isDark ? "light" : "dark")} variant="outline" size="icon">
      {isDark ?
        <Sun size={20} />
      : <Moon size={20} />}
    </Button>
  );
};
