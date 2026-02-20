import { BarChart3, Folder, LucideIcon, Settings, User } from "lucide-react";
import { SettingsModal } from "@/widgets";
import { ReactNode } from "react";
import { ActionButton } from "./ActionButton";

interface UserActionsButton {
  icon: LucideIcon;
  soon?: boolean;
  render: () => ReactNode;
}

const userActionButtons: UserActionsButton[] = [
  {
    icon: User,
    render: () => <ActionButton icon={User}>Мой профиль</ActionButton>,
  },
  {
    icon: BarChart3,
    render: () => <ActionButton icon={BarChart3}>Статистика</ActionButton>,
  },
  {
    icon: Folder,
    render: () => (
      <ActionButton icon={Folder} soon={true}>
        Достижения
      </ActionButton>
    ),
  },
  {
    icon: Settings,
    render: () => (
      <SettingsModal>
        <ActionButton icon={Settings}>Настройки</ActionButton>
      </SettingsModal>
    ),
  },
];

export const UserActions = () => {
  return (
    <ul className="flex flex-col gap-0.5">
      {userActionButtons.map((item, index) => (
        <li key={index}>{item.render()}</li>
      ))}
    </ul>
  );
};
