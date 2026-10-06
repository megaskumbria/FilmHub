import { useTranslations } from "next-intl";
import { ACTION_GROUPS } from "../model/ActionGroups";
import { Separator } from "@/shared/ui";
import { useAuthStore } from "@/features/auth";

export const UserActions = () => {
  const t = useTranslations("header.menu");

  const { user } = useAuthStore();
  const { id: userId } = user;

  return (
    <div className="flex flex-col gap-3">
      {ACTION_GROUPS.map((group) => (
        <div key={group.labelKey} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 pr-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              {t(group.labelKey)}
            </span>

            <Separator className="h-px flex-1 bg-border" />
          </div>

          <ul className="flex flex-col gap-0.5">
            {group.items.map((item, index) => (
              <li key={index}>{item.render(t(item.labelKey), userId ?? "")}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
