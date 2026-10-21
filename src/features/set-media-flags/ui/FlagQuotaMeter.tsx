import { AnimatePresence, motion } from "framer-motion";
import { type FlagItem } from "@/shared/hooks";
import { MAX_LIMIT_PER_MEDIA } from "../model/constants";

interface Props {
  flags: FlagItem[];
}

export const FlagQuotaMeter = ({ flags }: Props) => {
  return (
    <div className="flex gap-1.5" aria-hidden>
      {Array.from({ length: MAX_LIMIT_PER_MEDIA }).map((_, i) => {
        const flag = flags[i];

        return (
          <span
            key={i}
            className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          >
            <AnimatePresence initial={false}>
              {flag && (
                <motion.span
                  key={flag.id}
                  className="absolute inset-0 origin-left rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  style={{
                    backgroundColor: flag.color,
                    boxShadow: `0 0 10px color-mix(in srgb, ${flag.color} 70%, transparent)`,
                  }}
                />
              )}
            </AnimatePresence>
          </span>
        );
      })}
    </div>
  );
};
