import { Button } from "@/shared/ui";
import { UserSettings } from "@/widgets/user-settings";
import { Flag, Folder, User } from "lucide-react";

import { useTranslations } from "next-intl";

const userActionsButtons: { icon: React.ReactNode; text: string }[] = [
  {
    icon: <User size={18} />,
    text: "YourProfile",
  },
  {
    icon: <Folder size={18} />,
    text: "YourCollections",
  },
  {
    icon: <Flag size={18} />,
    text: "YourFlags",
  },
  // {
  //   icon: <Settings size={18} />,
  //   text: "Settings",
  // },
];

export const UserActions = () => {
  const t = useTranslations("UserMenu");

  return (
    <ul className="flex flex-col gap-2">
      {userActionsButtons.map((item, index) => (
        <li className="flex gap-1" key={index}>
          {/* TODO: эти кнопки должны стать навигационными ссылка */}
          <Button>
            {item.icon}
            <span>{t(item.text)}</span>
          </Button>
        </li>
      ))}
      <li>
        <UserSettings />
      </li>
    </ul>
  );
};
