import { Button } from "@/shared/ui";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button>;

export const AddBookmarkButton = (props: Props) => {
  return (
    <Button
      variant="transparent"
      {...props}
      className="group/bookmark isolate absolute -top-px -left-px z-20 h-18 w-11 justify-center overflow-hidden rounded-tl-xl p-0 text-foreground [clip-path:inset(0_round_12px_0_0_0)]"
    >
      <svg viewBox="-2 -2 52 84" className="size-full" aria-hidden>
        <polygon points="-2,68 24,56 50,68 50,74 24,62 -2,74" className="fill-obsidian/40" />
        <polygon
          points="-2,-2 50,-2 50,68 24,56 -2,68"
          className="fill-charcoal/85 transition-colors duration-200 group-hover/bookmark:fill-charcoal group-data-[state=open]/bookmark:fill-charcoal"
        />
        <g className="stroke-foreground" strokeWidth="2.25" strokeLinecap="square" fill="none">
          <line x1="24" y1="14" x2="24" y2="30" />
          <line x1="16" y1="22" x2="32" y2="22" />
        </g>
      </svg>
    </Button>
  );
};
