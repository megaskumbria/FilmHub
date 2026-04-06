import { AvatarFallback, Avatar, Button } from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea";
import { Send } from "lucide-react";

export const CommentsSheetFooter = () => {
  return (
    <footer className="border-t border-border px-5 py-4 shrink-0 space-y-3 bg-surface">
      <div className="flex gap-3">
        <Avatar className="size-8 shrink-0 mt-1">
          <AvatarFallback
            className="text-xs font-semibold text-white"
            style={{ backgroundColor: "#9b56f0" }}
          >
            PI
          </AvatarFallback>
        </Avatar>

        <div className="relative flex-1">
          <Textarea
            value=""
            onChange={() => {}}
            placeholder="Write a comment…"
            className="placeholder:text-zinc-muted w-full min-h-[72px] text-sm bg-background border-border resize-none pr-16 pb-10"
          />

          <Button
            variant="accent"
            size="sm"
            onClick={() => {}}
            disabled={false}
            className="absolute bottom-2 right-2 rounded-lg gap-2 px-3"
          >
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
