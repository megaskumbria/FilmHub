import { Upload } from "lucide-react";

interface DragOverlayProps {
  visible: boolean;
}

export const DragOverlay = ({ visible }: DragOverlayProps) => (
  <div
    className="absolute inset-0 z-20 rounded-xl pointer-events-none transition-all duration-300"
    style={{ opacity: visible ? 1 : 0 }}
  >
    <div className="absolute inset-0 rounded-xl bg-black/70" />

    <div className="absolute inset-0 rounded-xl border-2 border-dashed border-accent/50" />

    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
      <div
        className="flex items-center justify-center size-12 rounded-2xl bg-accent/15 border border-accent/40"
        style={{
          boxShadow: "0 0 20px rgba(155, 86, 240, 0.25)",
          animation: visible ? "pulse 1.5s ease-in-out infinite" : "none",
        }}
      >
        <Upload className="size-5 text-accent" />
      </div>
      <span className="text-[10px] font-semibold text-accent/90 tracking-widest uppercase">
        Drop poster here
      </span>
    </div>
  </div>
);
