import { Button } from "@/shared/ui";
import { Flag, Folder, LucideIcon, User } from "lucide-react";

interface UserActionsButton {
  icon: LucideIcon;
  text: string;
}

const userActionsButtons: UserActionsButton[] = [
  {
    icon: User,
    text: "Статистика",
  },
  {
    icon: Folder,
    text: "Достижения (soon)",
  },
  {
    icon: Flag,
    text: "Мой профиль",
  },
  // {
  //   icon: <Settings size={18} />,
  //   text: "Settings",
  // },
];

export const UserActions = () => {
  return (
    <ul className="flex flex-col gap-2">
      {userActionsButtons.map((item, index) => (
        <li className="flex gap-1" key={index}>
          <Button className="w-full justify-start border-0 bg-transparent text-[#e5e5e5]">
            <item.icon size={18} />
            <span>{item.text}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};
