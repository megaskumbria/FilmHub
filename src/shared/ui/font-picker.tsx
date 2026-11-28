"use client";

import { Button } from "@/shared/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/shared/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import type { GoogleFont } from "@/shared/lib/fonts";
import { fetchGoogleFonts, fontSupportsCyrillic, loadFont } from "@/shared/lib/fonts";
import { useTranslations } from "next-intl";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { cn } from "@/shared/lib/utils";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { IconChevronDown } from "@tabler/icons-react";
import * as React from "react";
import { List, type RowComponentProps } from "react-window";

function FontListItem({
  font,
  isSelected,
  onSelect,
}: {
  font: GoogleFont;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isFontLoaded) {
      loadFont(font.family)
        .then(() => setIsFontLoaded(true))
        .catch((error) => console.error("Failed to load font:", error));
    }
  }, [isFontLoaded, font.family]);

  return (
    <CommandItem
      value={font.family}
      onSelect={onSelect}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-none px-3 py-2.5 transition-colors outline-hidden",
        "data-[selected=true]:bg-white/8 data-[selected=true]:text-foreground",
        isSelected && "bg-accent/10",
        isSelected && "data-[selected=true]:bg-accent/20",
      )}
      data-selected={isSelected}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-obsidian/40 text-lg leading-none transition-colors",
          isSelected && "border-accent/40 text-accent",
          !isFontLoaded && "opacity-40",
        )}
        style={{
          fontFamily: isFontLoaded ? font.family : "system-ui",
          fontOpticalSizing: "none",
          fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0, "dlig" 0',
        }}
      >
        Aa
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className={cn("truncate text-sm font-medium", isSelected && "text-accent")}>
            {font.family}
          </span>
          <Check
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-accent transition-opacity duration-150",
              isSelected ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
        <span
          className={cn(
            "block truncate text-xs leading-none text-zinc-muted transition-opacity duration-300",
            isFontLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            fontFamily: isFontLoaded ? font.family : "system-ui",
            fontOpticalSizing: "none",
            fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0, "dlig" 0',
          }}
        >
          The quick brown fox
        </span>
      </div>
    </CommandItem>
  );
}

type FontListRowProps = {
  fonts: GoogleFont[];
  selectedFamily: string | undefined;
  onSelectFont: (font: GoogleFont) => void;
};

function FontListRow({
  index,
  style,
  ariaAttributes,
  fonts,
  selectedFamily,
  onSelectFont,
}: RowComponentProps<FontListRowProps>) {
  const font = fonts[index];
  if (!font) {
    return null;
  }
  return (
    <div className="overflow-hidden" style={style} {...ariaAttributes}>
      <FontListItem
        font={font}
        isSelected={selectedFamily === font.family}
        onSelect={() => onSelectFont(font)}
      />
    </div>
  );
}

interface FontPickerProps {
  onChange?: (font: GoogleFont["family"]) => void;
  value?: string;
  width?: number;
  height?: number;
  className?: string;
  showFilters?: boolean;
  accentColor?: string;
}

export function FontPicker({
  onChange,
  value,
  height = 300,
  className,
  showFilters = true,
  accentColor,
}: FontPickerProps) {
  const t = useTranslations("flags.fontPicker");
  const [selectedFont, setSelectedFont] = React.useState<GoogleFont | null>(null);
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [fonts, setFonts] = React.useState<GoogleFont[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [cyrillicOnly, setCyrillicOnly] = React.useState(true);
  const [triggerFontReady, setTriggerFontReady] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const loadFonts = async () => {
      try {
        setIsLoading(true);
        const fetchedFonts = await fetchGoogleFonts();
        setFonts(fetchedFonts);
        const font = fetchedFonts.find((font) => font.family === value);
        if (font) {
          setSelectedFont(font);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load fonts"));
        console.error("Error loading fonts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    void loadFonts();
  }, [value]);

  React.useEffect(() => {
    if (!value) {
      setTriggerFontReady(false);
      return;
    }
    setTriggerFontReady(false);
    void loadFont(value)
      .then(() => setTriggerFontReady(true))
      .catch((error) => console.error("Failed to load font:", error));
  }, [value]);

  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(fonts.map((font) => font.category));
    return Array.from(uniqueCategories).sort();
  }, [fonts]);

  const filteredFonts = React.useMemo(() => {
    return fonts.filter((font: GoogleFont) => {
      const matchesSearch = font.family.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !showFilters || selectedCategory === "all" || font.category === selectedCategory;
      const matchesScript = !cyrillicOnly || fontSupportsCyrillic(font);
      return matchesSearch && matchesCategory && matchesScript;
    });
  }, [fonts, search, selectedCategory, showFilters, cyrillicOnly]);

  const handleSelectFont = React.useCallback(
    (font: GoogleFont) => {
      setSelectedFont(font);
      void loadFont(font.family).catch((error) => console.error("Failed to load font:", error));
      onChange?.(font.family);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleOpenChange = React.useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const rowProps = React.useMemo(
    () => ({
      fonts: filteredFonts,
      selectedFamily: selectedFont?.family,
      onSelectFont: handleSelectFont,
    }),
    [filteredFonts, selectedFont?.family, handleSelectFont],
  );

  const displayFamily = selectedFont?.family ?? value;
  const categoryLabel =
    selectedFont?.category && t.has(`categories.${selectedFont.category}`) ?
      t(`categories.${selectedFont.category}`)
    : selectedFont?.category;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={t("selectAria")}
          className={cn(
            "group h-auto w-full items-stretch justify-between gap-2.5 rounded-xl border-border/40 bg-obsidian/40 px-2 py-1.5 text-left font-normal",
            "hover:border-border/70 hover:bg-obsidian/55",
            "data-[state=open]:border-accent/40 data-[state=open]:bg-obsidian/60",
            "transition-colors duration-150",
            className,
          )}
        >
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border/50 bg-surface-subtle text-base leading-none text-foreground transition-colors group-hover:border-border"
            style={{
              fontFamily: triggerFontReady && displayFamily ? displayFamily : "system-ui",
              color: accentColor,
              fontOpticalSizing: "none",
              fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0, "dlig" 0',
            }}
          >
            Aa
          </span>

          <span className="flex min-w-0 flex-1 flex-col justify-center">
            {displayFamily ?
              <>
                <span className="truncate text-sm font-medium leading-tight text-foreground">
                  {displayFamily}
                </span>
                <span
                  className="truncate text-[11px] leading-tight text-zinc-muted/70"
                  style={{
                    fontFamily: triggerFontReady ? displayFamily : undefined,
                    fontOpticalSizing: "none",
                    fontFeatureSettings: '"liga" 0, "clig" 0, "calt" 0, "dlig" 0',
                  }}
                >
                  {categoryLabel ?? t("choose")}
                </span>
              </>
            : <span className="text-sm text-zinc-muted/70">{t("choose")}</span>}
          </span>

          <IconChevronDown
            className={cn(
              "size-3.5 shrink-0 self-center text-zinc-muted/45 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "shadow-popover border-border/60 bg-surface-subtle p-0",
          "w-(--radix-popover-trigger-width) max-w-(--radix-popover-trigger-width)",
        )}
        align="start"
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder={t("search")}
            value={search}
            onValueChange={setSearch}
            className="w-full text-sm placeholder:text-zinc-muted/60"
          />
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-border/60 px-3 py-1.5">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {showFilters && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="text-xs">
                        {selectedCategory === "all" ?
                          t("allCategories")
                        : t.has(`categories.${selectedCategory}`) ?
                          t(`categories.${selectedCategory}`)
                        : selectedCategory}
                      </span>
                      <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-50 border-border/60 bg-surface-subtle"
                  >
                    <DropdownMenuRadioGroup
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <DropdownMenuRadioItem value="all">
                        <span>{t("allCategories")}</span>
                      </DropdownMenuRadioItem>
                      {categories.map((category) => (
                        <DropdownMenuRadioItem key={category} value={category}>
                          <span>
                            {t.has(`categories.${category}`) ?
                              t(`categories.${category}`)
                            : category}
                          </span>
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div className="flex items-center gap-1.5">
                <Switch
                  id="font-picker-cyrillic"
                  size="sm"
                  checked={cyrillicOnly}
                  onCheckedChange={setCyrillicOnly}
                  aria-label={t("cyrillicAria")}
                />
                <Label
                  htmlFor="font-picker-cyrillic"
                  className="cursor-pointer gap-1.5 font-normal text-zinc-muted"
                >
                  <span className="text-xs">{t("cyrillic")}</span>
                </Label>
              </div>
            </div>
            <span className="shrink-0 text-xs text-zinc-muted/60">
              {t("count", { count: filteredFonts.length })}
            </span>
          </div>
          {isLoading ?
            <div className="flex items-center justify-center p-6">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          : error ?
            <div className="flex items-center justify-center p-4 text-sm text-destructive">
              {t("loadFailed")}
            </div>
          : <>
              <CommandEmpty className="py-6 text-center text-sm text-zinc-muted">
                {t("empty")}
              </CommandEmpty>

              <CommandGroup className="p-0">
                <div className="scrollbar-minimal overflow-y-auto" style={{ height }}>
                  <List<FontListRowProps>
                    defaultHeight={height}
                    rowComponent={FontListRow}
                    rowCount={filteredFonts.length}
                    rowHeight={58}
                    rowProps={rowProps}
                    style={{ height, width: "100%" }}
                  />
                </div>
              </CommandGroup>
            </>
          }
        </Command>
      </PopoverContent>
    </Popover>
  );
}
