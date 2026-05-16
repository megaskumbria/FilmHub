import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { Button } from "@/shared/ui";

interface Props {
  selectedIcon: number;
  setSelectedIcon: (icon: number) => void;
}

export const FolderIconPicker = ({ selectedIcon, setSelectedIcon }: Props) => {
  return (
    <div className="flex flex-col gap-2.5">
      <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">Icon</Label>
      <div className="grid grid-cols-8 justify-items-center gap-1.5 max-h-50 overflow-y-auto scrollbar-minimal">
        {ICONS.map(({ icon: Icon, label }, i) => (
          <Button
            key={i}
            title={label}
            onClick={() => setSelectedIcon(i)}
            className={cn(
              "size-11 rounded-lg flex items-center justify-center transition-all duration-150",
              "border text-muted hover:text-foreground",
              selectedIcon === i ?
                "bg-accent/15 border-accent/50 text-accent"
              : "bg-surface border-border hover:bg-surface-elevated",
            )}
          >
            <Icon className="size-6" />
          </Button>
        ))}
      </div>
    </div>
  );
};
