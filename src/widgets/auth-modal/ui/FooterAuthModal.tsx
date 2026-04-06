import { Button, DialogFooter } from "@/shared/ui";

interface FooterAuthModalProps {
  tab: "signin" | "signup";
  setTab: (tab: "signin" | "signup") => void;
}

export const FooterAuthModal = ({ tab, setTab }: FooterAuthModalProps) => {
  return (
    <DialogFooter className="border-t border-border bg-surface/50 px-6 py-5 w-full">
      <p className="text-sm text-muted flex items-center justify-center text-center gap-1">
        <span>{tab === "signin" ? "No account?" : "Already have an account?"}</span>

        <Button
          className="font-bold text-accent hover:text-accent/80"
          onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
        >
          <span>{tab === "signin" ? "Create one" : "Sign in"}</span>
        </Button>
      </p>
    </DialogFooter>
  );
};
