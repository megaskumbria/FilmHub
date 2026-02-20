"use client";

import { useState } from "react";
import { Film, ImageIcon, Star } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Separator,
} from "@/shared/ui";
import { Label } from "@/shared/ui/label";
import { ReactNode } from "react";

interface SettingsModalProps {
  children: ReactNode;
}

type MenuKey = "movie-card";
type ZoneKey = "poster" | "hover" | "body";

interface ZoneBlock {
  id: string;
  label: string;
}

const BLOCKS: ZoneBlock[] = [
  { id: "title", label: "Название" },
  { id: "description", label: "Описание" },
  { id: "genres", label: "Жанры" },
  { id: "flags", label: "Флаги" },
  { id: "rating", label: "Рейтинг" },
];

const MENU_ITEMS: { key: MenuKey; label: string; icon: ReactNode }[] = [
  { key: "movie-card", label: "Карточка фильма", icon: <Film className="size-4" /> },
];

const ZONES: { key: ZoneKey; label: string; dotClass: string }[] = [
  { key: "poster", label: "POSTER", dotClass: "bg-blue-400" },
  { key: "hover", label: "HOVER", dotClass: "bg-accent" },
  { key: "body", label: "BODY", dotClass: "bg-emerald-accent" },
];

type CheckedState = Record<ZoneKey, Record<string, boolean>>;

const defaultChecked: CheckedState = { poster: {}, hover: {}, body: {} };

export const SettingsModal = ({ children }: SettingsModalProps) => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("movie-card");
  const [checked, setChecked] = useState<CheckedState>(defaultChecked);

  const toggle = (zone: ZoneKey, blockId: string) => {
    setChecked((prev) => ({
      ...prev,
      [zone]: { ...prev[zone], [blockId]: !prev[zone][blockId] },
    }));
  };

  const getCount = (zone: ZoneKey) => Object.values(checked[zone]).filter(Boolean).length;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="w-full max-w-[960px] sm:max-w-[960px] h-[680px] p-0 gap-0 overflow-hidden bg-background border-border"
        showCloseButton
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 flex flex-col border-r border-border bg-surface-subtle">
            <DialogHeader className="px-5 pt-5 pb-4">
              <DialogTitle className="text-xs font-semibold text-zinc-muted tracking-widest uppercase">
                Настройки
              </DialogTitle>
            </DialogHeader>
            <Separator />
            <nav className="flex flex-col gap-1 p-3">
              {MENU_ITEMS.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveMenu(key)}
                  className={[
                    "relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left overflow-hidden",
                    activeMenu === key ?
                      "bg-accent/10 text-accent border border-accent/20"
                    : "text-zinc-muted hover:bg-secondary hover:text-foreground border border-transparent",
                  ].join(" ")}
                >
                  {activeMenu === key && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                  )}
                  {icon}
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex flex-1 min-w-0 overflow-hidden h-full">
            {activeMenu === "movie-card" && (
              <>
                {/* Zones panel */}
                <section className="w-72 shrink-0 flex flex-col border-r border-border overflow-y-auto bg-surface h-full">
                  <div className="px-5 pt-5 pb-4">
                    <h3 className="text-xs font-semibold text-zinc-muted tracking-widest uppercase">
                      Зоны карточки
                    </h3>
                  </div>
                  <Separator />

                  <Accordion
                    type="multiple"
                    defaultValue={["poster", "hover", "body"]}
                    className="px-4 py-1"
                  >
                    {ZONES.map(({ key, label, dotClass }) => {
                      const count = getCount(key);
                      return (
                        <AccordionItem key={key} value={key} className="border-border">
                          <AccordionTrigger className="text-xs font-bold tracking-widest text-zinc-muted hover:no-underline hover:text-foreground px-1 py-3.5">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className={`size-1.5 rounded-full shrink-0 ${dotClass}`} />
                              <span>{label}</span>
                              {count > 0 && (
                                <span className="ml-auto mr-2 text-[10px] font-semibold text-accent bg-accent/15 px-1.5 py-0.5 rounded-full leading-none tabular-nums">
                                  {count}
                                </span>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-2.5 px-1 pb-3">
                              {BLOCKS.map((block) => (
                                <div
                                  key={block.id}
                                  onClick={() => toggle(key, block.id)}
                                  className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-surface-subtle transition-colors group/row"
                                >
                                  <Checkbox
                                    id={`${key}-${block.id}`}
                                    checked={!!checked[key][block.id]}
                                    onCheckedChange={() => toggle(key, block.id)}
                                    className="size-4 border-zinc-muted/40 bg-surface data-[state=checked]:bg-accent data-[state=checked]:border-accent pointer-events-none"
                                  />
                                  <Label
                                    htmlFor={`${key}-${block.id}`}
                                    className="text-sm text-zinc-muted cursor-pointer group-hover/row:text-foreground transition-colors font-normal pointer-events-none"
                                  >
                                    {block.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </section>

                {/* Preview */}
                <section className="relative flex flex-1 flex-col items-center justify-center bg-obsidian p-8 gap-7 min-w-0 overflow-hidden h-full">
                  {/* Subtle dot grid background */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Accent glow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

                  <p className="relative text-xs font-semibold tracking-widest uppercase text-zinc-muted">
                    Превью
                  </p>

                  <div className="relative w-[230px] aspect-2/3 rounded-xl border border-white/8 bg-zinc-900 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/70 ring-1 ring-white/5">
                    {/* Poster zone — background */}
                    <div className="absolute inset-0 bg-linear-to-br from-zinc-800/60 via-zinc-900/80 to-zinc-950" />
                    <ImageIcon className="size-12 text-white/10 relative z-10" />

                    {/* Hover zone overlay mock */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-accent/5 to-transparent" />

                    {/* Body gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />

                    {/* Body zone content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2.5">
                      <div className="h-3 w-4/5 rounded-sm bg-white/70" />
                      <div className="space-y-1.5">
                        <div className="h-2 w-full rounded-sm bg-white/20" />
                        <div className="h-2 w-3/5 rounded-sm bg-white/15" />
                      </div>
                      <div className="flex gap-1.5 pt-0.5">
                        <div className="h-5 w-14 rounded bg-accent/30 border border-accent/25" />
                        <div className="h-5 w-11 rounded bg-accent/30 border border-accent/25" />
                      </div>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <Star className="size-3 fill-gold text-gold" />
                        <div className="h-2 w-8 rounded-sm bg-gold/50" />
                      </div>
                    </div>

                    {/* POSTER zone label */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[8px] font-bold tracking-wider text-blue-400/70 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 uppercase">
                        poster
                      </span>
                    </div>
                  </div>

                  {/* Zone legend */}
                  <div className="relative flex items-center gap-4">
                    {ZONES.map(({ key, label, dotClass }) => (
                      <div key={key} className="flex items-center gap-1.5">
                        <span className={`size-1.5 rounded-full ${dotClass}`} />
                        <span className="text-[10px] font-medium tracking-wider text-zinc-muted/60 uppercase">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="relative text-[11px] text-zinc-muted/40 text-center max-w-[190px] leading-relaxed">
                    Настройте видимость блоков в каждой зоне карточки
                  </p>
                </section>
              </>
            )}
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};
