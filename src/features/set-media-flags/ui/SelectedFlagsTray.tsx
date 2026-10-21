import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { FlagBadge } from "@/entities";
import { type FlagItem } from "@/shared/hooks";

interface Props {
  selectedFlags: Record<string, FlagItem>;
  onRemove: (scaleName: string, flag: FlagItem) => void;
}

export const SelectedFlagsTray = ({ selectedFlags, onRemove }: Props) => {
  const t = useTranslations("movie.flags");
  const entries = Object.entries(selectedFlags);

  return (
    <section className="relative min-h-14 rounded-xl border border-dashed border-border/60 bg-surface-subtle/60 px-2 py-2">
      {entries.length === 0 && (
        <p className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm text-zinc-muted">
          {t("pickHint")}
        </p>
      )}

      <ul className="flex flex-wrap gap-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {entries.map(([scaleName, flag]) => (
            <motion.li
              key={flag.id}
              layout
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Button
                onClick={() => onRemove(scaleName, flag)}
                aria-label={`${t("remove")}: ${flag.flagName}`}
                className="group relative rounded-sm"
              >
                <FlagBadge flagItem={flag} />

                <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full border border-border bg-popover text-zinc-muted opacity-0 scale-75 transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:text-foreground group-focus-visible:opacity-100">
                  <IconX className="size-3" stroke={2.5} />
                </span>
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};
