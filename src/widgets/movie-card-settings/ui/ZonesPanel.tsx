"use client";

import {
  Separator,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Label,
} from "@/shared/ui";
import { ZONES } from "../model/zones";
import { ZoneKey } from "../lib/types";
import { useMovieCardLayout } from "@/shared/model/stores/movie-card-layout";
import { MOVIE_CARD_LAYOUT_KEY } from "@/shared/storages/storage-keys";

export const ZonesPanel = () => {
  const { layout, setLayout } = useMovieCardLayout();

  const handleChecked = (zone: ZoneKey, blockId: string, checked: boolean) => {
    const newLayout = {
      ...layout,
      [zone]: checked ? [...layout[zone], blockId] : layout[zone].filter((id) => id !== blockId),
    };

    localStorage.setItem(MOVIE_CARD_LAYOUT_KEY, JSON.stringify(newLayout));
    setLayout(newLayout);
  };

  return (
    <section className="flex flex-col border-r border-border overflow-y-auto bg-surface min-h-0 drawer-scroll">
      <div className="px-5 pt-5 pb-4">
        <h3 className="text-xs font-semibold text-zinc-muted tracking-widest uppercase">
          Зоны карточки
        </h3>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={["poster", "hover", "body"]} className="px-4 py-1">
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
                <div className="flex flex-col gap-2.5 px-1 pb-3">
                  {blocks.map((block) => (
                    <Label
                      key={block.id}
                      htmlFor={`${key}-${block.id}`}
                      className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-surface-subtle transition-colors group/row text-sm text-zinc-muted group-hover/row:text-foreground font-normal"
                    >
                      <Checkbox
                        id={`${key}-${block.id}`}
                        checked={layout[key].includes(block.id)}
                        onCheckedChange={(checked) => handleChecked(key, block.id, !!checked)}
                      />
                      {block.label}
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};
