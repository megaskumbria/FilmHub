import { BarChart3, Clapperboard, Flag, Folder, LucideIcon, Settings, Users } from "lucide-react";
import { ActionButton } from "../ui/ActionButton";
import { SettingsModal, FollowersSheet } from "@/widgets";
import { SheetTrigger } from "@/shared/ui";
import { ReactNode } from "react";

interface UserActionsGroup {
  labelKey: string;
  items: UserActionsButton[];
}

interface UserActionsButton {
  icon: LucideIcon;
  labelKey: string;
  soon?: boolean;
  render: (label: string, userId?: string) => ReactNode;
}

export const ACTION_GROUPS: UserActionsGroup[] = [
  {
    labelKey: "account",
    items: [
      {
        icon: Users,
        labelKey: "subscriptions",
        render: (label, userId) => (
          <FollowersSheet userId={userId ?? ""}>
            <SheetTrigger asChild>
              <ActionButton icon={Users}>{label}</ActionButton>
            </SheetTrigger>
          </FollowersSheet>
        ),
      },
      {
        icon: BarChart3,
        labelKey: "statistics",
        render: (label) => (
          <ActionButton icon={BarChart3} soon={true}>
            {label}
          </ActionButton>
        ),
      },
      {
        icon: Folder,
        labelKey: "achievements",
        render: (label) => (
          <ActionButton icon={Folder} soon={true}>
            {label}
          </ActionButton>
        ),
      },
    ],
  },
  {
    labelKey: "collections",
    items: [
      {
        icon: Clapperboard,
        labelKey: "myCollections",
        render: (label, userId) => (
          <ActionButton icon={Clapperboard} href={`/collections/${userId}`}>
            {label}
          </ActionButton>
        ),
      },
      {
        icon: Flag,
        labelKey: "flags",
        render: (label) => (
          <ActionButton icon={Flag} href="/creation-flag">
            {label}
          </ActionButton>
        ),
      },
    ],
  },
  {
    labelKey: "system",
    items: [
      {
        icon: Settings,
        labelKey: "settings",
        render: (label) => (
          <SettingsModal>
            <ActionButton icon={Settings}>{label}</ActionButton>
          </SettingsModal>
        ),
      },
    ],
  },
];
