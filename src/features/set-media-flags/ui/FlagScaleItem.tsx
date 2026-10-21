import { AccordionItem, AccordionTrigger, AccordionContent, Button } from "@/shared/ui";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/shared/lib/utils";
import { type FlagItem } from "@/shared/hooks/useFlags";
import { FlagBadge } from "@/entities";
import { useTranslations } from "next-intl";

interface Props {
  flags: FlagItem[];
  scaleName: string;
  handleSelectFlag: (scaleName: string, flag: FlagItem, mediaId: number, scaleId: string) => void;
  selectedFlags: Record<string, FlagItem>;
  isLimitFlags: boolean;
  mediaId: number;
  scaleId: string;
}

export const FlagScaleItem = ({
  flags,
  scaleName,
  handleSelectFlag,
  selectedFlags,
  isLimitFlags,
  mediaId,
  scaleId,
}: Props) => {
  const t = useTranslations("movie.flags");

  const isUsedFlag = flags.find((flag) => flag.isUsed);
  const displayFlag = selectedFlags[scaleName] ?? isUsedFlag;

  const isScaleSelected = Boolean(displayFlag);
  const isScaleBlocked = isLimitFlags && !isScaleSelected;

  return (
    <AccordionItem
      value={scaleName}
      className={cn(
        "group/scale relative overflow-hidden rounded-xl border border-border/40 bg-card/70 transition-all duration-300 last:border-b data-[state=open]:bg-card data-[state=open]:border-border/70",
        isScaleBlocked && "opacity-40 pointer-events-none",
      )}
      style={
        displayFlag ?
          {
            borderColor: `color-mix(in srgb, ${displayFlag.color} 35%, transparent)`,
            backgroundImage: `linear-gradient(90deg, color-mix(in srgb, ${displayFlag.color} 9%, transparent), transparent 55%)`,
          }
        : undefined
      }
    >
      <span
        aria-hidden
        className="absolute inset-y-2 left-0 w-0.75 rounded-r-full bg-border/60 transition-all duration-300"
        style={{
          backgroundColor: displayFlag?.color,
          boxShadow: `0 0 10px ${displayFlag?.color}`,
        }}
      />

      <AccordionTrigger className="min-h-12 items-center py-2 pl-4 pr-3 rounded-none text-sm font-medium text-foreground/80 hover:no-underline hover:text-foreground transition-colors gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
        <span className="flex items-center gap-2 flex-1 min-w-0">
          <span className="flex flex-col min-w-0">
            <span className="truncate">{scaleName}</span>
            <span className="text-sm font-normal text-zinc-muted/80">
              {t("flagsCount", { count: flags.length })}
            </span>
          </span>

          {displayFlag && (
            <span className="ml-auto mr-1 shrink-0 animate-in fade-in-0 zoom-in-90 duration-200">
              <FlagBadge flagItem={displayFlag} />
            </span>
          )}
        </span>
      </AccordionTrigger>

      <AccordionContent className="px-3 pt-1 pb-3">
        <div className="flex flex-wrap gap-2 border-t border-dashed border-border/50 pt-3">
          {flags.map((flag) => {
            const isChecked = selectedFlags[scaleName]?.id === flag.id || Boolean(flag.isUsed);
            const isDimmed = isScaleSelected && !isChecked;

            return (
              <Button
                onClick={() => handleSelectFlag(scaleName, flag, mediaId, scaleId)}
                key={flag.id}
                className={cn(
                  "relative rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                  isDimmed && "opacity-45 saturate-50 hover:opacity-100 hover:saturate-100",
                )}
                style={
                  isChecked ?
                    {
                      filter: `drop-shadow(0 0 8px color-mix(in srgb, ${flag.color} 60%, transparent))`,
                    }
                  : undefined
                }
              >
                <FlagBadge flagItem={flag} />

                {isChecked && (
                  <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_8px_rgba(155,86,240,0.7)] ring-2 ring-card animate-in zoom-in-50 duration-200">
                    <IconCheck className="size-3" stroke={3} />
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
