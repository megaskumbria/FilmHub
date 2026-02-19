import { Button } from "@/shared/ui";
import { BarChart3, Folder, LucideIcon, Settings, User } from "lucide-react";
import { SettingsModal } from "@/widgets";
import { ReactNode } from "react";

interface UserActionsButton {
  icon: LucideIcon;
  soon?: boolean;
  render: (buttonStyles: string) => ReactNode;
}

const userActionButtons: UserActionsButton[] = [
  {
    icon: User,
    render: (buttonStyles: string) => <Button className={buttonStyles}>Мой профиль</Button>,
  },
  {
    icon: BarChart3,
    render: (buttonStyles: string) => <Button className={buttonStyles}>Статистика</Button>,
  },
  {
    icon: Folder,
    soon: true,
    render: (buttonStyles: string) => <Button className={buttonStyles}>Достижения</Button>,
  },
  {
    icon: Settings,
    render: (buttonStyles: string) => (
      <SettingsModal>
        <Button className={buttonStyles}>Настройки</Button>
      </SettingsModal>
    ),
  },
];

export const UserActions = () => {
  const buttonStyles =
    "group px-1 h-10 w-full justify-start gap-3 rounded-xl text-card-foreground transition-colors hover:bg-accent/10 hover:text-accent";

  return (
    <ul className="flex flex-col gap-0.5">
      {userActionButtons.map((item) => (
        <li key={item.icon.toString()}>
          {/* <Button
            disabled={item.soon}
            className="group px-1 h-10 w-full justify-start gap-3 rounded-xl text-card-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          > */}
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors group-hover:bg-accent/20 group-hover:text-accent">
              <item.icon size={16} strokeWidth={2} className="text-primary" />
            </span>
            {item.render(buttonStyles)}
          </div>

          {/* <span className="flex-1 text-left">{item.text}</span> */}

          {item.soon && (
            <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
              Soon
            </span>
          )}
          {/* </Button> */}
        </li>
      ))}
    </ul>
  );
};
