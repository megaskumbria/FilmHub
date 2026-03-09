import { ACTION_GROUPS } from "../model/action-groups";
import { Separator } from "@/shared/ui";

export const UserActions = () => {
  return (
    <div className="flex flex-col gap-3">
      {ACTION_GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 pr-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
              {group.label}
            </span>

            <Separator className="h-px flex-1 bg-border" />
          </div>

          <ul className="flex flex-col gap-0.5">
            {group.items.map((item, index) => (
              <li key={index}>{item.render()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
