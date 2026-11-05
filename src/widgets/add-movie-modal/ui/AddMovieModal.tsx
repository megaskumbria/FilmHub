"use client";

import { useRef, useState, type ReactNode } from "react";
import { ImagePlus, Info, X } from "lucide-react";
import {
  Button,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  useComboboxAnchor,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AGE_RATINGS, CONTENT_TYPES, GENRES, type ContentType } from "../model/content-types";

const SCORE_OPTIONS = Array.from({ length: 10 }, (_, i) => String(i + 1));

interface AddMovieModalProps {
  children: ReactNode;
}

export function AddMovieModal({ children }: AddMovieModalProps) {
  const [selectedType, setSelectedType] = useState<ContentType>("movie");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const genreAnchorRef = useComboboxAnchor();
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const isSeries = selectedType === "series" || selectedType === "cartoon-series";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-140 gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <DialogTitle className="text-base font-semibold text-foreground">
            Add manually
          </DialogTitle>

          <DialogClose asChild>
            <Button size="none" className="p-1 text-muted hover:text-foreground transition-colors">
              <X className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div ref={dialogContentRef} className="overflow-y-auto max-h-[75vh]">
          <div className="px-5 py-5 flex flex-col gap-5">
            {/* Content type */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Type
              </Label>
              <div className="grid grid-cols-4 gap-1.5">
                {CONTENT_TYPES.map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    type="button"
                    onClick={() => setSelectedType(value)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl border transition-all duration-150",
                      selectedType === value ?
                        "bg-accent/10 border-accent/50 text-accent"
                      : "bg-surface border-border text-zinc-muted hover:text-foreground hover:bg-surface-elevated",
                    )}
                  >
                    <Icon size={18} />
                    <span className="text-xs font-medium">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Cover + fields */}
            <div className="flex gap-4 h-full min-h-80 w-full">
              <Button
                size="icon"
                className="shrink-0 flex-1 w-full flex justify-center h-auto rounded-xl border-2 border-dashed border-border bg-surface hover:bg-surface-elevated hover:border-accent/40 transition-all duration-200 group"
              >
                <ImagePlus className="size-6 text-zinc-muted group-hover:text-accent transition-colors" />

                <span className="text-xs text-zinc-muted group-hover:text-accent transition-colors text-center leading-tight">
                  Cover
                </span>
              </Button>

              <div className="flex flex-col justify-between max-w-72 w-full">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                    Title
                  </Label>

                  <Input
                    variant="neutral"
                    placeholder="Movie title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      Year
                    </Label>
                    <Input variant="neutral" inputSize="default" placeholder="2024" maxLength={4} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      {isSeries ? "Seasons" : "Min."}
                    </Label>

                    <Input
                      variant="neutral"
                      inputSize="default"
                      placeholder={isSeries ? "3" : "120"}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      Age rating
                    </Label>

                    <Select
                      value={selectedAge ?? ""}
                      onValueChange={(v) => setSelectedAge(v || null)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>

                      <SelectContent>
                        {AGE_RATINGS.map((age) => (
                          <SelectItem key={age} value={age}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-col gap-2.5">
                  <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                    Genres
                  </Label>

                  <Combobox multiple value={selectedGenres} onValueChange={setSelectedGenres}>
                    <ComboboxChips
                      ref={genreAnchorRef}
                      scrollable
                      className="bg-surface border-border min-h-9"
                    >
                      {selectedGenres.map((genre) => (
                        <ComboboxChip key={genre}>{genre}</ComboboxChip>
                      ))}
                      <ComboboxChipsInput
                        placeholder={selectedGenres.length === 0 ? "Select genres..." : ""}
                      />
                    </ComboboxChips>

                    <ComboboxContent anchor={genreAnchorRef} container={dialogContentRef}>
                      <ComboboxList>
                        <ComboboxEmpty>No results</ComboboxEmpty>
                        {GENRES.map((genre) => (
                          <ComboboxItem key={genre} value={genre}>
                            {genre}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>

                {/* Score */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-x-2">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      My score
                    </Label>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="size-4 text-zinc-muted hover:text-foreground transition-colors cursor-pointer" />
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>Your personal rating</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Select
                    value={selectedScore ?? ""}
                    onValueChange={(v) => setSelectedScore(v || null)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not selected" />
                    </SelectTrigger>

                    <SelectContent>
                      {SCORE_OPTIONS.map((score) => (
                        <SelectItem key={score} value={score}>
                          {score}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Description
              </Label>

              <Textarea
                placeholder="Short plot summary..."
                className="resize-none min-h-20 rounded-lg bg-graphite border-border/40 placeholder:text-zinc-muted text-sm focus-visible:border-accent/50 focus-visible:ring-0 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="sm"
              className="rounded-lg text-sm text-muted hover:text-foreground"
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className="rounded-lg text-sm"
            disabled={!title.trim()}
          >
            <span className="font-medium">Add to collection</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
