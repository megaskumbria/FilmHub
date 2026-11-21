"use client";

import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { Button } from "./button";

const SIZE_CLASSNAME = {
  5: "size-5",
  6: "size-6",
};

interface Props {
  show: boolean;
  onClear: () => void;
  size: 5 | 6;
}

export const SearchClearButton = ({ show, onClear, size }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          key="clear"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <Button
            type="button"
            onClick={onClear}
            className={cn(
              "group rounded-full bg-muted/15 transition-colors hover:bg-accent/20",
              SIZE_CLASSNAME[size],
            )}
          >
            <IconX className="size-3.5 text-muted transition-colors group-hover:text-accent" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
