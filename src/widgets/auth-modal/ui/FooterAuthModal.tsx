import { Button, DialogFooter } from "@/shared/ui";

interface FooterAuthModalProps {
  tab: "signin" | "signup";
  setTab: (tab: "signin" | "signup") => void;
}

export const FooterAuthModal = ({ tab, setTab }: FooterAuthModalProps) => {
  return (
    <DialogFooter className="border-t border-border/60 bg-background/40 px-5 py-4 w-full">
      <p className="text-sm text-zinc-muted flex items-center justify-center text-center gap-1.5">
        <span>{tab === "signin" ? "Don't have an account?" : "Already have an account?"}</span>

        <Button
          type="button"
          size="none"
          className="font-semibold text-accent hover:text-accent/80 transition-colors p-0"
          onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
        >
          <span>{tab === "signin" ? "Sign up" : "Sign in"}</span>
        </Button>
      </p>
    </DialogFooter>
  );
};
