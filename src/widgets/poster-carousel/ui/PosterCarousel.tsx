"use client";

import { KeyboardEvent, useEffect, useRef } from "react";
import Image from "next/image";
import { useIdle } from "react-use";
import { useTranslations } from "next-intl";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Button, FilmPerforation } from "@/shared/ui";

interface Props {
  frames: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
  titleToDisplay: string;
}

const IDLE_TIMEOUT = 6000;
const SLIDESHOW_DELAY = 4000;
const IDLE_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

const NAVIGATION_KEYS: Record<string, number> = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
};

const pad = (value: number) => String(value).padStart(2, "0");

export const PosterCarousel = ({ frames, activeIndex, onSelect, titleToDisplay }: Props) => {
  const t = useTranslations("movie");
  const listRef = useRef<HTMLOListElement>(null);
  const isIdle = useIdle(IDLE_TIMEOUT, false, IDLE_EVENTS);
  const total = frames.length;

  const wrap = (index: number) => (index + total) % total;

  useEffect(() => {
    if (!isIdle) return;

    const timer = setTimeout(() => onSelect(wrap(activeIndex + 1)), SLIDESHOW_DELAY);
    return () => clearTimeout(timer);
  }, [isIdle, activeIndex, total]);

  // Scrolls only the strip itself: scrollIntoView would also drag the page back to the hero.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[activeIndex] as HTMLElement | undefined;
    if (!list || !item) return;

    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    list.scrollTo({
      top: item.offsetTop - (list.clientHeight - item.offsetHeight) / 2,
      left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [activeIndex]);

  const select = (index: number, moveFocus = false) => {
    const next = wrap(index);
    onSelect(next);

    if (moveFocus) listRef.current?.children[next]?.querySelector("button")?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    const delta = NAVIGATION_KEYS[event.key];
    if (!delta) return;

    event.preventDefault();
    select(activeIndex + delta, true);
  };

  return (
    <nav aria-label={t("frames")} className="flex min-h-0 flex-col gap-3 lg:flex-1">
      <div className="flex items-center justify-between gap-3">
        <p className="font-unbounded text-xs tabular-nums text-shadow-flag">
          <span className="text-white">{pad(activeIndex + 1)}</span>
          <span className="text-white/60"> / {pad(total)}</span>
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="glass"
            size="icon-xs"
            className="rounded-full"
            aria-label={t("prevFrame")}
            onClick={() => select(activeIndex - 1)}
          >
            <IconChevronUp className="-rotate-90 lg:rotate-0" />
          </Button>

          <Button
            variant="glass"
            size="icon-xs"
            className="rounded-full"
            aria-label={t("nextFrame")}
            onClick={() => select(activeIndex + 1)}
          >
            <IconChevronDown className="-rotate-90 lg:rotate-0" />
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-col bg-black/75 py-1.5 backdrop-blur-sm lg:flex-1 lg:flex-row lg:px-1.5 lg:py-0">
        <FilmPerforation className="lg:hidden" />
        <FilmPerforation orientation="vertical" className="hidden lg:block" />

        <ol
          ref={listRef}
          onKeyDown={handleKeyDown}
          className="relative flex min-h-0 flex-1 snap-x gap-2 overflow-x-auto p-2 [scrollbar-width:none] lg:snap-y lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto [&::-webkit-scrollbar]:hidden"
        >
          {frames.map((frame, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={frame} className="w-36 shrink-0 snap-center sm:w-40 lg:w-full">
                <Button
                  variant="frame"
                  aria-pressed={isActive}
                  aria-label={t("frameLabel", { index: index + 1 })}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  className="aspect-video"
                >
                  <Image
                    src={frame}
                    alt={titleToDisplay}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </Button>
              </li>
            );
          })}
        </ol>

        <FilmPerforation className="lg:hidden" />
        <FilmPerforation orientation="vertical" className="hidden lg:block" />
      </div>
    </nav>
  );
};
