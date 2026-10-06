import { useTranslations } from "next-intl";
import { Button, DialogFooter } from "@/shared/ui";
import { Tab } from "./AuthModal";

interface Props {
  tab: string;
  setTab: (tab: Tab) => void;
}

export const FooterAuthModal = ({ tab, setTab }: Props) => {
  const t = useTranslations("auth");

  return (
    <DialogFooter className="border-t border-border/60 bg-background/40 px-5 py-4 w-full">
      <p className="text-sm text-zinc-muted flex items-center justify-center text-center gap-1.5">
        <span>{tab === "signin" ? t("noAccount") : t("hasAccount")}</span>

        <Button
          type="button"
          size="none"
          className="font-semibold text-accent hover:text-accent/80 transition-colors p-0"
          onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
        >
          <span>{tab === "signin" ? t("signUp") : t("signIn")}</span>
        </Button>
      </p>
    </DialogFooter>
  );
};
