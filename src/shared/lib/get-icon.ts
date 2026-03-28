import { ICON_MAP } from "@/shared/model/icons";
import { Flame, LucideIcon } from "lucide-react";

export const getIconByName = (name: string): LucideIcon => {
  return ICON_MAP.find((i) => i.name === name)?.icon ?? Flame;
};
