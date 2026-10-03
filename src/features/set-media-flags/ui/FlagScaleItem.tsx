import { AccordionItem, AccordionTrigger, AccordionContent, Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { type FlagItem } from "@/shared/hooks/useFlags";
import { FlagBadge } from "@/entities";

interface Props {
  flags: FlagItem[];
  scaleName: string;
  handleSelectFlag: (
    scaleName: string,
    flag: FlagItem,
    mediaId: number,
    scaleId: string,
  ) => void;
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
  const isUsedFlag = flags.find((flag) => flag.isUsed);
  const isScaleSelected = Boolean(selectedFlags[scaleName]);
  const isScaleBlocked = isLimitFlags && !isScaleSelected;

  const displayFlag = selectedFlags[scaleName] ?? isUsedFlag;

  return (
    <AccordionItem
      value={scaleName}
      className={cn(
        "border-b border-border last:border-0 transition-opacity duration-300",
        isScaleBlocked && "opacity-40 pointer-events-none",
      )}
    >
      <AccordionTrigger className="h-10 items-center px-2 py-2.5 rounded-none text-sm font-medium text-foreground/70 hover:no-underline hover:bg-white/4 hover:text-foreground transition-all gap-2 data-[state=open]:text-foreground [&>svg]:text-zinc-muted/60 [&[data-state=open]>svg]:text-zinc-muted">
        <span className="flex items-center gap-2 flex-1 min-w-0">
          <span className="truncate">{scaleName}</span>

          {displayFlag && (
            <span className="ml-auto mr-1 shrink-0">
              <FlagBadge flagItem={displayFlag} />
            </span>
          )}
        </span>
      </AccordionTrigger>

      <AccordionContent className="pb-1">
        <div className="flex flex-col gap-0">
          {flags.map((flag) => {
            const isChecked = selectedFlags[scaleName]?.id === flag.id || flag.isUsed;

            return (
              <Button
                onClick={() => handleSelectFlag(scaleName, flag, mediaId, scaleId)}
                key={flag.id}
                className={cn(
                  "flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all hover:bg-white/4",
                  isChecked && "bg-accent/8 shadow-[inset_0_0_0_1px_rgba(155,86,240,0.25)]",
                )}
              >
                <FlagBadge flagItem={flag} />
                <span
                  className={cn(
                    "relative flex items-center justify-center size-3.5 rounded-full border shrink-0 transition-all",
                    isChecked ?
                      "border-accent bg-accent/20 shadow-[0_0_6px_rgba(155,86,240,0.4)]"
                    : "border-border/50",
                  )}
                >
                  {isChecked && <span className="size-2 rounded-full bg-accent" />}
                </span>
              </Button>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
