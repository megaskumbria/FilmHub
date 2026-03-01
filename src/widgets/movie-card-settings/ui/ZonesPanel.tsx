"use client";

import {
  Separator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
  Switch,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Button,
} from "@/shared/ui";
import { ZONES } from "../model/zones";
import { ZoneKey } from "../lib/types";
import { useMovieCardLayout, defaultLayout } from "@/shared/model/stores/movie-card-layout";
import { MOVIE_CARD_LAYOUT_KEY } from "@/shared/storages/storage-keys";
import { BlockKey } from "@/shared/types/movie-card-blocks";
import { HelpCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const ZonesPanel = () => {
  const { layout, setLayout, blockOptions, setBlockOption } = useMovieCardLayout();

  const handleChecked = (zone: ZoneKey, blockId: string, checked: boolean) => {
    const newLayout = { ...layout };

    Object.keys(newLayout).forEach((zone) => {
      newLayout[zone as ZoneKey] = newLayout[zone as ZoneKey].filter((id) => id !== blockId);
    });

    if (checked) {
      newLayout[zone] = [...newLayout[zone], blockId as BlockKey];
    }

    localStorage.setItem(MOVIE_CARD_LAYOUT_KEY, JSON.stringify(newLayout));
    setLayout(newLayout);
  };

  const handleReset = () => {
    setLayout(defaultLayout);
    toast.success("Настройки сброшены к значениям по умолчанию", { position: "bottom-left" });
  };

  return (
    <section className="flex flex-col border-r border-border bg-surface min-h-0 ">
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h3 className="text-xs font-semibold text-zinc-muted tracking-widest uppercase">
          Зоны карточки
        </h3>

        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleReset}
                size="icon-xs"
                className="text-zinc-muted hover:text-accent p-0 transition-colors flex justify-center items-center"
              >
                <RotateCcw className="size-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Сбросить к значениям по умолчанию</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="w-6! flex justify-center items-center h-6 text-zinc-muted hover:text-accent transition-colors shrink-0">
              <HelpCircle className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Блок может быть активен только в одной зоне.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator />

      <Accordion
        type="multiple"
        defaultValue={ZONES.map((z) => z.key)}
        className="px-4 py-1 overflow-y-auto drawer-scroll"
      >
        {ZONES.map(({ key, label, dotClass, blocks }) => {
          return (
            <AccordionItem key={key} value={key} className="border-border">
              <AccordionTrigger className="cursor-pointer text-xs font-bold tracking-widest text-zinc-muted hover:no-underline hover:text-foreground px-1 py-3.5 [&>svg]:size-3 [&>svg]:text-zinc-muted/50 [&>svg]:translate-y-0 hover:[&>svg]:text-foreground [&>svg]:transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={`size-1.5 rounded-full shrink-0 ${dotClass}`} />
                  <span>{label}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="flex flex-col gap-2.5">
                  {blocks.map((block) => {
                    const isChecked = layout[key].includes(block.id);

                    return (
                      <div key={block.id} className="flex flex-col">
                        <Label
                          htmlFor={`${key}-${block.id}`}
                          className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-surface-subtle transition-colors group/row text-sm text-zinc-muted group-hover/row:text-foreground font-normal"
                        >
                          <Checkbox
                            id={`${key}-${block.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleChecked(key, block.id, !!checked)}
                          />
                          {block.label}
                        </Label>

                        {isChecked && block.subOptions && (
                          <div className="ml-9 mt-1 mb-1.5 border-l border-border pl-2.5 flex flex-col gap-0.5">
                            {block.subOptions.map((opt) => (
                              <Label
                                key={opt.id}
                                htmlFor={`${key}-${block.id}-${opt.id}`}
                                className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-surface-subtle transition-colors group/sub cursor-pointer"
                              >
                                <span className="text-xs text-zinc-muted/60 group-hover/sub:text-zinc-muted transition-colors">
                                  {opt.label}
                                </span>
                                <Switch
                                  id={`${key}-${block.id}-${opt.id}`}
                                  size="sm"
                                  checked={blockOptions?.[key]?.[block.id]?.[opt.storeKey] ?? true}
                                  onCheckedChange={(checked) =>
                                    setBlockOption(key, block.id, opt.storeKey, checked)
                                  }
                                />
                              </Label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};
