import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui";
import { DeleteAccountModal } from "./DeleteAccountModal";

export const DeleteAccount = () => {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Delete account</p>
          <p className="text-sm text-zinc-muted mt-0.5">This action cannot be undone</p>
        </div>
      </div>

      <DeleteAccountModal>
        <Button
          size="sm"
          className="shrink-0 rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 hover:border-destructive/60 transition-colors px-4 text-sm"
        >
          <span>Delete</span>
        </Button>
      </DeleteAccountModal>
    </div>
  );
};
