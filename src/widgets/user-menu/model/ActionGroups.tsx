import { BarChart3, Clapperboard, Flag, Folder, LucideIcon, Settings, Users } from "lucide-react";
import { ActionButton } from "../ui/ActionButton";
import { SettingsModal, FollowersSheet } from "@/widgets";
import { SheetTrigger } from "@/shared/ui";
import { ReactNode } from "react";

interface UserActionsGroup {
  label: string;
  items: UserActionsButton[];
}

interface UserActionsButton {
  icon: LucideIcon;
  soon?: boolean;
  render: (userId?: string) => ReactNode;
}

export const ACTION_GROUPS: UserActionsGroup[] = [
  {
    label: "Account",
    items: [
      {
        icon: Users,
        render: (userId?: string) => (
          <FollowersSheet userId={userId ?? ""}>
            <SheetTrigger asChild>
              <ActionButton icon={Users}>Subscriptions</ActionButton>
            </SheetTrigger>
          </FollowersSheet>
        ),
      },
      {
        icon: BarChart3,
        render: () => (
          <ActionButton icon={BarChart3} soon={true}>
            Statistics
          </ActionButton>
        ),
      },
      {
        icon: Folder,
        render: () => (
          <ActionButton icon={Folder} soon={true}>
            Achievements
          </ActionButton>
        ),
      },
    ],
  },
  {
    label: "Collections",
    items: [
      {
        icon: Clapperboard,
        render: (userId?: string) => (
          <ActionButton icon={Clapperboard} href={`/collections/${userId}`}>
            My collections
          </ActionButton>
        ),
      },
      {
        icon: Flag,
        render: () => (
          <ActionButton icon={Flag} href="/creation-flag">
            Flags
          </ActionButton>
        ),
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        icon: Settings,
        render: () => (
          <SettingsModal>
            <ActionButton icon={Settings}>Settings</ActionButton>
          </SettingsModal>
        ),
      },
    ],
  },
];
