import { ICON_MAP } from "@/shared/model/icons";
import { LucideIcon } from "lucide-react";

export const getIconByName = (name: string | null): LucideIcon | null => {
  return ICON_MAP.find((i) => i.name === name)?.icon ?? null;
};
