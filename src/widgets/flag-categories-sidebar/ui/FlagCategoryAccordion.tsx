import { flagsData } from "@/shared/model/flags/mockFlags";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Label,
} from "@/shared/ui";
import { Plus, PencilLine, Trash2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { FlagBadge } from "@/entities";

export const FlagCategoryAccordion = () => {
  const {
    setCategory,
    setFlagName,
    flagName: activeFlagName,
    addPresetColor,
    presetColors,
  } = useCreationFlagStore();

  const handleSelectFlag = (flagName: string, category: string, color: string) => {
    addPresetColor(color);
    setFlagName(flagName, color);
    setCategory(category);
  };

  const handleAddFlag = (category: string) => {
    setFlagName("", presetColors[0]);
    setCategory(category);
  };

  return (
    <>
      {flagsData.length === 0 ?
        <div className="py-8 text-center text-xs text-zinc-muted">Ничего не найдено</div>
      : <Accordion type="multiple">
          {flagsData.map(({ category, flagItems }) => (
            <AccordionItem
              key={category}
              value={category}
              className="border-b border-border/40 last:border-0"
            >
              <AccordionTrigger className="items-center px-2 py-2 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="truncate">{category}</span>

                  <div className="ml-auto flex items-center gap-1.5 shrink-0">
                    <span className="px-1.5 py-0.5 rounded text-xs font-medium tabular-nums text-zinc-muted bg-white/6 border border-border/30">
                      {flagItems.length}
                    </span>

                    <Button
                      asChild
                      size="icon-xs"
                      variant="transparent"
                      className="flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddFlag(category);
                      }}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-1">
                <ul className="flex flex-col gap-0.5">
                  {flagItems.map((flag) => {
                    const { flagName, color } = flag;
                    const isActive = activeFlagName === flagName;

                    return (
                      <li key={`${category}-${flag.id}`}>
                        <Label
                          onClick={() => handleSelectFlag(flagName, category, color)}
                          className={cn(
                            "group hover:bg-white/5 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all select-none",
                            isActive && "bg-white/6",
                          )}
                          style={isActive ? { boxShadow: `inset 0 0 0 1px ${color}40` } : undefined}
                        >
                          <FlagBadge flagItem={flag} />

                          <span className="flex items-center gap-1.5 shrink-0">
                            <PencilLine
                              className={cn(
                                "size-3.5 transition-all duration-150",
                                isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40",
                              )}
                              style={{ color: isActive ? color : undefined }}
                            />

                            <span className="w-px h-3 bg-border/40 transition-all duration-150 opacity-0 group-hover:opacity-100" />

                            <Trash2
                              onClick={(e) => e.stopPropagation()}
                              className="size-3.5 text-zinc-muted opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all duration-150 cursor-pointer"
                            />
                          </span>
                        </Label>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
    </>
  );
};
