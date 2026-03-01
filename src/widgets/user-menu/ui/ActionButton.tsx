import { Button } from "@/shared/ui/button";
import { LucideIcon } from "lucide-react";
import { forwardRef, ReactNode } from "react";

interface ActionButtonProps {
  icon: LucideIcon;
  children: ReactNode;
  soon?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon: Icon, children, soon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={soon}
        className="flex items-center group px-1 h-10 w-full justify-start gap-3 rounded-xl text-card-foreground transition-colors hover:bg-accent/10 hover:text-accent"
      >
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors group-hover:bg-accent/20 group-hover:text-accent">
            <Icon size={16} strokeWidth={2} className="text-primary" />
          </span>
        </div>

        <span className="flex-1 text-left">{children}</span>

        {soon && (
          <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
            Soon
          </span>
        )}
      </Button>
    );
  },
);
