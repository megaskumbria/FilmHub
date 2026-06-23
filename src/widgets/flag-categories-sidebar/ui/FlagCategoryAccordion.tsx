import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useCreationFlagStore } from "@/features/creation-flag/model/creation-flag-store";
import { useFlags } from "@/shared/hooks";
import { FlagCategoriesSkeleton } from "@/widgets/flag-categories-sidebar";
import { FlagListItem } from "@/features";

export const FlagCategoryAccordion = () => {
  const {
    setCategoryName,
    setFlagName,
    flagName: activeFlagName,
    presetColors,
  } = useCreationFlagStore();

  const { data: flagsData = [], isLoading } = useFlags();

  const handleAddFlag = (categoryName: string) => {
    setFlagName("", presetColors[0]);
    setCategoryName(categoryName);
  };

  return (
    <>
      {isLoading ?
        Array.from({ length: 5 }).map((_, index) => <FlagCategoriesSkeleton key={index} />)
      : flagsData.length === 0 ?
        <div className="py-8 text-center text-xs text-zinc-muted">Nothing found</div>
      : <Accordion type="multiple">
          {flagsData.map(({ categoryName, flags }) => (
            <AccordionItem
              key={categoryName}
              value={categoryName}
              className="border-b border-border/40 last:border-0"
            >
              <AccordionTrigger className="rounded-none items-center px-2 py-2 text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="truncate">{categoryName}</span>

                  <div className="ml-auto flex items-center gap-1.5 shrink-0">
                    <span className="px-1.5 w-6 h-6 py-0.5 flex items-center justify-center rounded text-sm font-medium tabular-nums text-zinc-muted bg-white/6 border border-border/30">
                      {flags.length}
                    </span>

                    <Button
                      asChild
                      size="icon-xs"
                      variant="transparent"
                      className="flex items-center justify-center shrink-0 rounded-md border border-border/40 bg-white/4 text-zinc-muted/70 hover:text-accent hover:border-accent/40 hover:bg-accent/10 transition-colors"
                      onClick={() => handleAddFlag(categoryName)}
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-1">
                <ul className="flex flex-col gap-0.5">
                  {flags.map((flag) => (
                    <FlagListItem
                      key={flag.id}
                      flagItem={flag}
                      categoryName={categoryName}
                      isActive={activeFlagName === flag.flagName}
                    />
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      }
    </>
  );
};
