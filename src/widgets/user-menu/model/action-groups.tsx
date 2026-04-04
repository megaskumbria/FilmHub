import {
  BarChart3,
  Clapperboard,
  Flag,
  Folder,
  LucideIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import { ActionButton } from "../ui/ActionButton";
import { ReactNode } from "react";
import { SettingsModal } from "@/widgets";
import { FollowersSheet } from "@/widgets/followers-sheet";
import { SheetTrigger } from "@/shared/ui";

interface UserActionsGroup {
  label: string;
  items: UserActionsButton[];
}

interface UserActionsButton {
  icon: LucideIcon;
  soon?: boolean;
  render: () => ReactNode;
}

export const ACTION_GROUPS: UserActionsGroup[] = [
  {
    label: "Аккаунт",
    items: [
      {
        icon: User,
        render: () => <ActionButton icon={User}>Мой профиль</ActionButton>,
      },
      {
        icon: BarChart3,
        render: () => (
          <ActionButton icon={BarChart3} href="/statistics">
            Статистика
          </ActionButton>
        ),
      },
      {
        icon: Users,
        render: () => (
          <FollowersSheet>
            <SheetTrigger asChild>
              <ActionButton icon={Users}>Подписки</ActionButton>
            </SheetTrigger>
          </FollowersSheet>
        ),
      },
      {
        icon: Folder,
        render: () => (
          <ActionButton icon={Folder} soon={true}>
            Достижения
          </ActionButton>
        ),
      },
    ],
  },
  {
    label: "Коллекции",
    items: [
      {
        icon: Clapperboard,
        render: () => (
          <ActionButton icon={Clapperboard} href="/my-collections">
            Мои коллекции
          </ActionButton>
        ),
      },
      {
        icon: Flag,
        render: () => (
          <ActionButton icon={Flag} href="/creation-flag">
            Флаги
          </ActionButton>
        ),
      },
    ],
  },
  {
    label: "Система",
    items: [
      {
        icon: Settings,
        render: () => (
          <SettingsModal>
            <ActionButton icon={Settings}>Настройки</ActionButton>
          </SettingsModal>
        ),
      },
    ],
  },
];
