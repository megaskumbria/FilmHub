import { Button, Label } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ICON_MAP } from "@/shared/model/icons";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { getIconByName } from "@/shared/lib";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
// import * as icons from "@lucide/icons";

export const FlagIconPicker = memo(() => {
  const { selectedIcon, setSelectedIcon } = useCreationFlagStore(
    useShallow((state) => ({
      selectedIcon: state.selectedIcon,
      setSelectedIcon: state.setSelectedIcon,
    })),
  );

  const SelectedIconComponent = getIconByName(selectedIcon);

  // Don't forget to migrate icons to the backend API
  // console.log(Object.keys(icons));

  return (
    <section className="rounded-xl border border-border/60 bg-surface-subtle p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <Label className="text-sm font-semibold text-foreground">Иконка</Label>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-muted">Выбрана:</span>

          <span className="flex items-center justify-center size-7 rounded-md bg-accent/10 border border-accent/30">
            <SelectedIconComponent className="size-4 text-accent" />
          </span>

          <span className="text-xs text-zinc-muted">{selectedIcon}</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5">
        {ICON_MAP.map(({ name, icon: Icon }) => (
          <Button
            key={name}
            onClick={() => setSelectedIcon(name)}
            className={cn(
              "flex items-center justify-center size-8 rounded-lg border transition-all cursor-pointer hover:bg-white/6",
              selectedIcon === name
                && "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(155,86,240,0.3)]",
              selectedIcon !== name && "border-border/40 text-zinc-muted hover:text-foreground",
            )}
            title={name}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </div>
    </section>
  );
});
