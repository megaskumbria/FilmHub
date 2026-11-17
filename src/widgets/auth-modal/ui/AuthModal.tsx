"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Clapperboard, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui";
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  ContinueWithGoogle,
  useAuthModalStore,
} from "@/features/auth";
import { FooterAuthModal } from "./FooterAuthModal";

const TABS = ["signin", "signup"] as const;
export type Tab = (typeof TABS)[number];

type AuthView = "auth" | "reset";

export function AuthModal() {
  const t = useTranslations("auth");

  const [tab, setTab] = useState<Tab>("signin");
  const [view, setView] = useState<AuthView>("auth");

  const { isOpen, open, close } = useAuthModalStore();

  const handleOpenChange = (next: boolean) => {
    if (next) {
      open();
      return;
    }

    close();
    setView("auth");
  };

  const returnToSignIn = () => {
    setTab("signin");
    setView("auth");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTitle className="sr-only">
        {view === "reset" ? t("reset.title") : t("title")}
      </DialogTitle>

      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="sm:max-w-105 gap-0 overflow-hidden rounded-2xl border border-border bg-surface p-0 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(155,86,240,0.06)]"
      >
        <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 ring-1 ring-accent/20">
              <Clapperboard className="size-4.5 text-accent" strokeWidth={1.75} aria-hidden />
            </div>

            <span className="text-foreground text-[15px] font-semibold tracking-tight">
              FilmHub
            </span>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              size="none"
              className="size-7 flex items-center justify-center rounded-md text-zinc-muted hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>
        </DialogHeader>

        {view === "auth" ?
          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="w-full gap-0">
            <TabsList className="flex w-full group-data-[orientation=horizontal]/tabs:h-auto h-auto rounded-none p-0 bg-transparent border-b border-border/60">
              {TABS.map((value) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="cursor-pointer flex-1 h-auto rounded-none border-0 border-b-2 border-transparent px-2 py-3 text-sm font-medium tracking-wide text-zinc-muted dark:text-zinc-muted transition-all hover:text-foreground data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent after:hidden"
                >
                  <span>{value === "signin" ? t("signIn") : t("signUp")}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="signin" className="mt-0 px-5 pt-6">
              <SignInForm onSuccess={() => close()} onForgotPassword={() => setView("reset")} />
            </TabsContent>

            <TabsContent value="signup" className="mt-0 px-5 pt-6">
              <SignUpForm onSuccess={() => close()} />
            </TabsContent>
          </Tabs>
        : <div className="px-5 pt-5">
            <ResetPasswordForm onCancel={returnToSignIn} onComplete={close} />
          </div>
        }

        {view === "auth" && (
          <div className="px-5 pt-4 pb-6">
            <ContinueWithGoogle />
          </div>
        )}

        {view === "auth" ?
          <FooterAuthModal tab={tab} setTab={setTab} />
        : <DialogFooter className="mt-6 border-t border-border/60 bg-background/40 px-5 py-4 w-full">
            <p className="flex w-full items-center justify-center">
              <Button
                type="button"
                size="none"
                className="p-0 text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                onClick={returnToSignIn}
              >
                <span>{t("reset.backToSignIn")}</span>
              </Button>
            </p>
          </DialogFooter>
        }
      </DialogContent>
    </Dialog>
  );
}
