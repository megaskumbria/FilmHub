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
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { cn } from "@/shared/lib/utils";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
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
        "flex cursor-pointer items-center gap-2.5 rounded-none px-3 py-2 transition-colors outline-hidden",
        "data-[selected=true]:bg-white/8 data-[selected=true]:text-foreground",
        isSelected && "bg-accent/10",
        isSelected && "data-[selected=true]:bg-accent/20",
      )}
      data-selected={isSelected}
    >
      <Check
        className={cn(
          "h-3.5 w-3.5 shrink-0 text-accent transition-opacity duration-150",
          isSelected ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("text-sm font-medium", isSelected && "text-accent")}>
          {font.family}
        </span>
        <span
          className={cn(
            "text-zinc-muted text-xs transition-opacity duration-300",
            isFontLoaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            fontFamily: isFontLoaded ? font.family : "system-ui",
          }}
        >
          Быстрая коричневая лиса
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
    <div style={style} {...ariaAttributes}>
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
}

export function FontPicker({
  onChange,
  value,

  height = 300,
  className,
  showFilters = true,
}: FontPickerProps) {
  const [selectedFont, setSelectedFont] = React.useState<GoogleFont | null>(null);
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [fonts, setFonts] = React.useState<GoogleFont[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [cyrillicOnly, setCyrillicOnly] = React.useState(true);
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
      return;
    }
    void loadFont(value).catch((error) => console.error("Failed to load font:", error));
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

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select font"
          className={cn(
            "group w-full relative h-9 justify-between px-2 border-border/40 bg-input/60 text-foreground font-normal",
            "hover:border-border hover:bg-input/80",
            "data-[state=open]:border-border data-[state=open]:bg-input/80",
            "transition-colors duration-150",
            className,
          )}
        >
          <span className="truncate text-sm">
            {selectedFont ?
              <span>{selectedFont.family}</span>
            : <span className="text-zinc-muted/70">Выберите шрифт...</span>}
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-zinc-muted/50" />
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
            placeholder="Поиск шрифта..."
            value={search}
            onValueChange={setSearch}
            className="text-sm placeholder:text-zinc-muted/60 w-full"
          />
          <div className="border-border/60 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b px-3 py-1.5">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {showFilters && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="text-xs capitalize">
                        {selectedCategory === "all" ? "Все категории" : selectedCategory}
                      </span>
                      <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="border-border/60 bg-surface-subtle w-[200px]"
                  >
                    <DropdownMenuRadioGroup
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <DropdownMenuRadioItem value="all">
                        <span>Все категории</span>
                      </DropdownMenuRadioItem>
                      {categories.map((category) => (
                        <DropdownMenuRadioItem
                          key={category}
                          value={category}
                          className="capitalize"
                        >
                          <span>{category}</span>
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
                  aria-label="Только шрифты с поддержкой кириллицы"
                />
                <Label
                  htmlFor="font-picker-cyrillic"
                  className="text-zinc-muted cursor-pointer gap-1.5 font-normal"
                >
                  <span className="text-xs">Кириллица</span>
                </Label>
              </div>
            </div>
            <span className="text-zinc-muted/60 shrink-0 text-xs">
              {filteredFonts.length} шрифтов
            </span>
          </div>
          {isLoading ?
            <div className="flex items-center justify-center p-6">
              <div className="border-accent h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          : error ?
            <div className="text-destructive flex items-center justify-center p-4 text-sm">
              Не удалось загрузить шрифты.
            </div>
          : <>
              <CommandEmpty className="text-zinc-muted py-6 text-sm text-center">
                Шрифты не найдены.
              </CommandEmpty>

              <CommandGroup className="p-0">
                <div className="scrollbar-minimal overflow-y-auto" style={{ height }}>
                  <List<FontListRowProps>
                    defaultHeight={height}
                    rowComponent={FontListRow}
                    rowCount={filteredFonts.length}
                    rowHeight={55}
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
