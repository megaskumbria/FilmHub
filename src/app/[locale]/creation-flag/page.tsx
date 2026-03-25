"use client";

import { useState } from "react";
import { Input, Label, Separator } from "@/shared/ui";
import { FlagBadge } from "@/widgets/movie-card/ui/FlagBadge";
import { cn } from "@/shared/lib/utils";
import {
  Flame,
  Skull,
  Ghost,
  Heart,
  Star,
  Zap,
  Eye,
  Moon,
  Sun,
  Cloud,
  Snowflake,
  Droplets,
  Wind,
  Leaf,
  TreePine,
  Mountain,
  Waves,
  Sparkles,
  Crown,
  Shield,
  Swords,
  Target,
  Gem,
  Bug,
  Brain,
  Atom,
  Rocket,
  Compass,
  Anchor,
  Feather,
  Coffee,
  Music,
  Film,
  Camera,
  Gamepad2,
  Puzzle,
  Dice5,
  Fingerprint,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import FontPicker from "react-fontpicker-ts";
import "react-fontpicker-ts/dist/index.css";
import { FlagCategoriesSidebar, PosterUploadSection } from "@/widgets";
import { IFlagItem } from "@/shared/model/flags";

const PRESET_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#be123c",
  "#9f1239",
  "#881337",
  "#c2410c",
  "#a16207",
  "#4d7c0f",
  "#15803d",
  "#047857",
  "#0f766e",
  "#0e7490",
  "#0369a1",
  "#1d4ed8",
  "#4338ca",
  "#6d28d9",
  "#7e22ce",
  "#a21caf",
  "#be185d",
  "#737373",
  "#525252",
  "#a3a3a3",
  "#d4d4d4",
  "#fafafa",
  "#18181b",
];

const ICON_MAP: { name: string; icon: LucideIcon }[] = [
  { name: "Flame", icon: Flame },
  { name: "Skull", icon: Skull },
  { name: "Ghost", icon: Ghost },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Zap", icon: Zap },
  { name: "Eye", icon: Eye },
  { name: "Moon", icon: Moon },
  { name: "Sun", icon: Sun },
  { name: "Cloud", icon: Cloud },
  { name: "Snowflake", icon: Snowflake },
  { name: "Droplets", icon: Droplets },
  { name: "Wind", icon: Wind },
  { name: "Leaf", icon: Leaf },
  { name: "TreePine", icon: TreePine },
  { name: "Mountain", icon: Mountain },
  { name: "Waves", icon: Waves },
  { name: "Sparkles", icon: Sparkles },
  { name: "Crown", icon: Crown },
  { name: "Shield", icon: Shield },
  { name: "Swords", icon: Swords },
  { name: "Target", icon: Target },
  { name: "Gem", icon: Gem },
  { name: "Bug", icon: Bug },
  { name: "Brain", icon: Brain },
  { name: "Atom", icon: Atom },
  { name: "Rocket", icon: Rocket },
  { name: "Compass", icon: Compass },
  { name: "Anchor", icon: Anchor },
  { name: "Feather", icon: Feather },
  { name: "Coffee", icon: Coffee },
  { name: "Music", icon: Music },
  { name: "Film", icon: Film },
  { name: "Camera", icon: Camera },
  { name: "Gamepad2", icon: Gamepad2 },
  { name: "Puzzle", icon: Puzzle },
  { name: "Dice5", icon: Dice5 },
  { name: "Fingerprint", icon: Fingerprint },
  { name: "CircleDot", icon: CircleDot },
  { name: "Sparkles2", icon: Sparkles },
];

const POPULAR_FLAGS: IFlagItem[] = [
  {
    id: 101,
    flagName: "Литературный шедевр",
    color: "#008a73",
    bg: "rgba(0, 138, 115, 0.38)",
    isUsed: true,
  },
  {
    id: 102,
    flagName: "Жуткая",
    color: "#ff937e",
    bg: "rgba(255, 147, 126, 0.38)",
    isUsed: true,
  },
  {
    id: 103,
    flagName: "Реалистичная",
    color: "#f4a261",
    bg: "rgba(244, 162, 97, 0.38)",
    isUsed: true,
  },
  {
    id: 104,
    flagName: "Обильное",
    color: "#ef476f",
    bg: "rgba(239, 71, 111, 0.38)",
    isUsed: true,
  },
  {
    id: 105,
    flagName: "Гнетущая атмосфера",
    color: "#5b21b6",
    bg: "rgba(91, 33, 182, 0.38)",
    isUsed: true,
  },
  {
    id: 106,
    flagName: "Невыносимая",
    color: "#1e3a8a",
    bg: "rgba(30, 58, 138, 0.38)",
    isUsed: true,
  },
  {
    id: 107,
    flagName: "Кошмарная",
    color: "#008a73",
    bg: "rgba(0, 138, 115, 0.38)",
    isUsed: true,
  },
  {
    id: 108,
    flagName: "Галлюциногенный",
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.38)",
    isUsed: true,
  },
  {
    id: 109,
    flagName: "Абсурдный",
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.38)",
    isUsed: true,
  },
  {
    id: 110,
    flagName: "Интенсивная",
    color: "#1d4ed8",
    bg: "rgba(29, 78, 216, 0.38)",
    isUsed: true,
  },
  {
    id: 111,
    flagName: "Погружающий",
    color: "#7c3aed",
    bg: "rgba(124, 58, 237, 0.38)",
    isUsed: true,
  },
  {
    id: 112,
    flagName: "Трип-визуал",
    color: "#047857",
    bg: "rgba(4, 120, 87, 0.38)",
    isUsed: true,
  },
];

export default function CreationFlagPage() {
  const [flagName, setFlagName] = useState("Новый флаг");
  const [selectedColor, setSelectedColor] = useState("#8b5cf6");
  const [selectedIcon, setSelectedIcon] = useState("Flame");
  const [selectedFont, setSelectedFont] = useState("Manrope");

  const selectedColorBg = selectedColor + "61";
  const SelectedIconComponent = ICON_MAP.find((i) => i.name === selectedIcon)?.icon ?? Flame;

  return (
    <div className="max-w-[1640px] w-full mx-auto px-6 pt-20 pb-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Создание флага</h1>
        <p className="text-sm text-zinc-muted mt-1">
          Настройте внешний вид и параметры нового флага для вашей коллекции
        </p>
      </header>

      <div className="flex gap-6 items-start">
        <FlagCategoriesSidebar />

        {/* ===== CENTER CONTENT ===== */}
        <main className="flex-1 min-w-0 grid grid-cols-[310px_1fr] grid-rows-[auto_auto] gap-4 items-stretch">
          <PosterUploadSection />

          {/* ── TOP RIGHT ROW: Flag Preview · Name + Font ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* [ORANGE] Flag Preview */}
            <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
                <span className="text-sm font-semibold text-foreground tracking-wide">
                  Предпросмотр флага
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-5 rounded-lg bg-obsidian/60 border border-border/30 py-8">
                <div
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg border"
                  style={{
                    backgroundColor: selectedColorBg,
                    borderColor: selectedColor,
                    fontFamily: selectedFont,
                  }}
                >
                  <SelectedIconComponent
                    className="size-5 shrink-0"
                    style={{ color: selectedColor }}
                  />
                  <span
                    className="text-lg font-bold"
                    style={{ color: selectedColor, textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                  >
                    {flagName || "Название флага"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-muted">Вид бейджа:</span>
                  <FlagBadge
                    flagItem={{
                      id: 0,
                      flagName: flagName || "Название",
                      color: selectedColor,
                      bg: selectedColorBg,
                      isUsed: false,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* [PURPLE] Name + Font */}
            <section className="rounded-xl border border-border/60 bg-surface-subtle p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
                <span className="text-sm font-semibold text-foreground tracking-wide">
                  Настройки
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
                  Название флага
                </Label>
                <Input
                  variant="neutral"
                  placeholder="Введите название..."
                  className="h-9 text-sm"
                  value={flagName}
                  onChange={(e) => setFlagName(e.target.value)}
                />
                <p className="text-[11px] text-zinc-muted/50">До 30 символов</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-zinc-muted uppercase tracking-wider">
                  Шрифт
                </Label>
                <div className="font-picker-wrapper">
                  <FontPicker
                    defaultValue={selectedFont}
                    value={(val) => setSelectedFont(val)}
                    autoLoad
                  />
                </div>
                <p className="text-[11px] text-zinc-muted/50">Выбран: {selectedFont}</p>
              </div>
            </section>
          </div>

          {/* ── BOTTOM RIGHT ROW: Color · Icon ── */}
          <div className="grid grid-cols-2 gap-4">
            {/* [GREEN] Color Picker */}
            <section className="rounded-xl border border-border/60 bg-surface-subtle p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
                  <Label className="text-sm font-semibold text-foreground">Цвет фона</Label>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="size-5 rounded-md border border-border/60"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-xs text-zinc-muted font-mono">{selectedColor}</span>
                </div>
              </div>

              <div className="grid grid-cols-10 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "size-9 rounded-lg border-2 transition-all cursor-pointer hover:scale-110",
                      selectedColor === color
                        && "border-foreground ring-2 ring-foreground/20 scale-110",
                      selectedColor !== color && "border-transparent",
                    )}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </section>

            {/* [BLUE] Icon Picker */}
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

              <div className="grid grid-cols-10 gap-2">
                {ICON_MAP.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedIcon(name)}
                    className={cn(
                      "flex items-center justify-center size-10 rounded-lg border transition-all cursor-pointer hover:bg-white/6",
                      selectedIcon === name
                        && "border-accent bg-accent/10 text-accent shadow-[0_0_8px_rgba(155,86,240,0.3)]",
                      selectedIcon !== name
                        && "border-border/40 text-zinc-muted hover:text-foreground",
                    )}
                    title={name}
                  >
                    <Icon className="size-5" />
                  </button>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ===== BOTTOM: Popular Flags ===== */}
      <Separator className="my-8 bg-border/40" />

      <section>
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-0.5 h-4 rounded-full bg-accent shrink-0 shadow-[0_0_6px_rgba(155,86,240,0.8)]" />
          <span className="text-sm font-semibold text-foreground tracking-wide">
            Популярные флаги
          </span>
          <span className="text-xs text-zinc-muted ml-1">— для вдохновения</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-3 drawer-scroll">
          {POPULAR_FLAGS.map((flag) => (
            <button
              key={flag.id}
              className="shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-border/40 bg-surface-subtle hover:bg-white/4 hover:border-accent/30 transition-all cursor-pointer group"
            >
              <FlagBadge flagItem={flag} />
              <span className="text-[10px] text-zinc-muted/50 group-hover:text-zinc-muted transition-colors">
                +{Math.floor(Math.random() * 200 + 50)}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
