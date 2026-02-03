import { Button } from "@/shared/ui";
import { BarChart3, Folder, LucideIcon, Settings, User } from "lucide-react";

interface UserActionsButton {
  icon: LucideIcon;
  text: string;
  soon?: boolean;
}

const userActionsButtons: UserActionsButton[] = [
  { icon: User, text: "Мой профиль" },
  { icon: BarChart3, text: "Статистика" },
  { icon: Folder, text: "Достижения", soon: true },
  { icon: Settings, text: "Настройки" },
];

export const UserActions = () => {
  return (
    <ul className="flex flex-col gap-0.5">
      {userActionsButtons.map((item) => (
        <li key={item.text}>
          <Button
            disabled={item.soon}
            className="group px-1 h-10 w-full justify-start gap-3 rounded-xl text-card-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors group-hover:bg-accent/20 group-hover:text-accent">
              <item.icon size={16} strokeWidth={2} className="text-primary" />
            </span>

            <span className="flex-1 text-left">{item.text}</span>

            {item.soon && (
              <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
                Soon
              </span>
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
};
