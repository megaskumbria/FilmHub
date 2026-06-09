import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { Dice5, RotateCcw } from "lucide-react";

interface Props {
  onResetPreview: () => void;
  onGetRandomPoster: () => void;
  isLoading: boolean;
}

export const PosterPreviewActions = ({ onResetPreview, onGetRandomPoster, isLoading }: Props) => {
  return (
    <>
      <Button
        onClick={onGetRandomPoster}
        disabled={isLoading}
        className={cn(
          "group/btn flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8 text-white/50 hover:bg-accent/10 hover:border-accent/25 hover:text-accent/90 transition-all duration-200 hover:scale-105 active:scale-95",
          isLoading && "bg-accent/10 border-accent/25 text-accent/90 scale-105 cursor-not-allowed",
        )}
      >
        <motion.div
          animate={isLoading ? { rotate: [0, 360] } : { rotate: 0 }}
          transition={{
            duration: 0.6,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        >
          <Dice5 className="size-3.5 transition-transform duration-500 group-hover/btn:rotate-[-360deg]" />
        </motion.div>

        <span className="text-xs font-medium tracking-wide">
          {isLoading ? "Rolling..." : "Random poster"}
        </span>
      </Button>

      <div className="w-px h-4 bg-white/10 rounded-full" />

      <Button
        onClick={onResetPreview}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/4 border border-white/8 text-white/30 hover:bg-white/6 hover:border-white/12 hover:text-white/60 transition-all duration-200 hover:scale-105 active:scale-95 group/reset"
      >
        <RotateCcw className="size-3 group-hover/reset:rotate-[-360deg] transition-transform duration-500" />
        <span className="text-xs font-medium tracking-wide">Reset</span>
      </Button>
    </>
  );
};
