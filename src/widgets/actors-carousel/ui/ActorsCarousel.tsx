"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "@/shared/ui";
import { CastMember } from "@/shared/hooks/useMedia";

interface Props {
  actors: CastMember[];
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

export const ActorsCarousel = ({ actors }: Props) => {
  const t = useTranslations("movie");
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const updateEdges = () => {
    const list = listRef.current;
    if (!list) return;

    setEdges({
      start: list.scrollLeft <= 1,
      end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 1,
    });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [actors]);

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;

    list.scrollBy({ left: direction * list.clientWidth * 0.8, behavior: "smooth" });
  };

  if (actors.length === 0) return null;

  return (
    <section aria-labelledby="movie-cast" className="min-w-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="movie-cast" className="font-unbounded text-lg font-medium text-white">
          {t("cast")}
        </h2>

        <div className="flex items-center gap-1.5">
          <Button
            variant="glass"
            size="icon-sm"
            className="rounded-full"
            aria-label={t("scrollBack")}
            disabled={edges.start}
            onClick={() => scroll(-1)}
          >
            <IconChevronLeft className="size-4" />
          </Button>

          <Button
            variant="glass"
            size="icon-sm"
            className="rounded-full"
            aria-label={t("scrollForward")}
            disabled={edges.end}
            onClick={() => scroll(1)}
          >
            <IconChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <ul
        ref={listRef}
        onScroll={updateEdges}
        className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {actors.map((actor) => (
          <li key={actor.id} className="w-28 shrink-0 snap-start sm:w-32">
            <figure>
              <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-elevated">
                {actor.profileUrl ?
                  <Image
                    src={actor.profileUrl}
                    alt={actor.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                : <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center font-unbounded text-2xl text-white/25"
                  >
                    {getInitials(actor.name)}
                  </span>
                }
              </div>

              <figcaption className="mt-2.5 font-manrope">
                <p className="text-sm font-semibold leading-snug text-white line-clamp-2">
                  {actor.name}
                </p>
                {actor.character && (
                  <p className="mt-0.5 text-xs leading-snug text-zinc-muted line-clamp-2">
                    {actor.character}
                  </p>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};
