"use client";

import { useState, type ReactNode } from "react";
import { ImagePlus, X } from "lucide-react";
import {
  Button,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
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
  Textarea,
  useComboboxAnchor,
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

  const isSeries = selectedType === "series" || selectedType === "cartoon-series";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-[560px] gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <DialogTitle className="text-base font-semibold text-foreground">
            Добавить вручную
          </DialogTitle>

          <DialogClose asChild>
            <Button size="none" className="p-1 text-muted hover:text-foreground transition-colors">
              <X className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[75vh]">
          <div className="px-5 py-5 flex flex-col gap-5">
            {/* Тип контента */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Тип
              </Label>
              <div className="grid grid-cols-4 gap-1.5">
                {CONTENT_TYPES.map(({ value, label, emoji }) => (
                  <button
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
                    <span className="text-lg leading-none">{emoji}</span>
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Обложка + Поля */}
            <div className="flex gap-4 items-stretch">
              <button
                type="button"
                className={cn(
                  "shrink-0 w-28 rounded-xl border-2 border-dashed border-border",
                  "flex flex-col items-center justify-center gap-2",
                  "bg-surface hover:bg-surface-elevated hover:border-accent/40 transition-all duration-200",
                  "group",
                )}
              >
                <ImagePlus className="size-6 text-zinc-muted group-hover:text-accent transition-colors" />
                <span className="text-[11px] text-zinc-muted group-hover:text-accent transition-colors text-center leading-tight">
                  Обложка
                </span>
              </button>

              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                    Название
                  </Label>
                  <Input
                    variant="neutral"
                    inputSize="default"
                    placeholder="Название фильма..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      Год
                    </Label>
                    <Input variant="neutral" inputSize="default" placeholder="2024" maxLength={4} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      {isSeries ? "Сезонов" : "Мин."}
                    </Label>
                    <Input
                      variant="neutral"
                      inputSize="default"
                      placeholder={isSeries ? "3" : "120"}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                      Возраст
                    </Label>
                    <Combobox value={selectedAge} onValueChange={(v) => setSelectedAge(v)}>
                      <ComboboxInput placeholder="—" showClear={!!selectedAge} className="w-full" />
                      <ComboboxContent>
                        <ComboboxList>
                          {AGE_RATINGS.map((age) => (
                            <ComboboxItem key={age} value={age}>
                              {age}
                            </ComboboxItem>
                          ))}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </div>
                </div>
              </div>
            </div>

            {/* Жанры */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Жанры
              </Label>
              <Combobox multiple value={selectedGenres} onValueChange={setSelectedGenres}>
                <ComboboxChips ref={genreAnchorRef} className="bg-surface border-border min-h-9">
                  {selectedGenres.map((genre) => (
                    <ComboboxChip key={genre}>{genre}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder={selectedGenres.length === 0 ? "Выберите жанры..." : ""}
                  />
                </ComboboxChips>
                <ComboboxContent anchor={genreAnchorRef}>
                  <ComboboxList>
                    <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
                    {GENRES.map((genre) => (
                      <ComboboxItem key={genre} value={genre}>
                        {genre}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            {/* Оценка */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Моя оценка
              </Label>
              <Combobox value={selectedScore} onValueChange={(v) => setSelectedScore(v)}>
                <ComboboxInput
                  placeholder="Не выбрано"
                  showClear={!!selectedScore}
                  className="w-full"
                />
                <ComboboxContent>
                  <ComboboxList>
                    {SCORE_OPTIONS.map((score) => (
                      <ComboboxItem key={score} value={score}>
                        {score} / 10
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-2.5">
              <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
                Описание
                <span className="ml-1.5 normal-case text-zinc-muted/60 font-normal tracking-normal">
                  — необязательно
                </span>
              </Label>
              <Textarea
                placeholder="Краткое описание сюжета..."
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
              <span>Отмена</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className="rounded-lg text-sm"
            disabled={!title.trim()}
          >
            <span className="font-medium">Добавить в коллекцию</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
