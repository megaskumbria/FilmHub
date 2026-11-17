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
  DialogTitle,
} from "@/shared/ui";
import {
  SignInForm,
  SignUpForm,
  ResetPasswordForm,
  ContinueWithGoogle,
  useAuthModalStore,
} from "@/features/auth";
import { AuthDeck, type DeckMode } from "./AuthDeck";

const TABS = ["signin", "signup"] as const;
export type Tab = (typeof TABS)[number];

type AuthView = "auth" | "reset";

export function AuthModal() {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  const [tab, setTab] = useState<Tab>("signin");
  const [view, setView] = useState<AuthView>("auth");

  const { isOpen, open, close } = useAuthModalStore();

  const deckMode: DeckMode = view === "reset" ? "reset" : tab;

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
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-2xl border border-border bg-surface p-0 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(155,86,240,0.06)] sm:max-w-190 sm:grid-cols-[300px_1fr]"
      >
        <DialogTitle className="sr-only">
          {view === "reset" ? t("reset.title") : t("title")}
        </DialogTitle>

        <aside className="relative flex items-center gap-4 overflow-hidden border-b border-border/60 bg-surface-subtle px-5 py-4 sm:flex-col sm:items-stretch sm:justify-between sm:gap-6 sm:border-r sm:border-b-0 sm:px-7 sm:py-7">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_42%,rgba(155,86,240,0.2),transparent_70%)]"
            aria-hidden
          />

          <div className="relative hidden items-center gap-2 sm:flex">
            <Clapperboard className="size-4 text-accent" strokeWidth={1.75} aria-hidden />
            <span className="text-sm font-semibold tracking-tight text-foreground/90">FilmHub</span>
          </div>

          <div className="relative order-2 sm:order-none">
            <AuthDeck mode={deckMode} />
          </div>

          <div className="relative order-1 flex-1 sm:order-none sm:flex-none">
            <p className="font-unbounded text-base leading-snug font-semibold tracking-tight text-balance text-foreground sm:text-xl">
              {t(`deck.${deckMode}.title`)}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-pretty text-zinc-muted sm:text-sm">
              {t(`deck.${deckMode}.text`)}
            </p>
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-col px-5 pt-5 pb-6 sm:px-8 sm:pt-7 sm:pb-7">
          <DialogClose asChild>
            <Button
              type="button"
              size="none"
              aria-label={tCommon("close")}
              className="absolute top-4 right-4 size-8 rounded-md text-zinc-muted transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent sm:top-5 sm:right-5"
            >
              <X className="size-4" />
            </Button>
          </DialogClose>

          {view === "auth" ?
            <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)} className="w-full gap-0">
              <TabsList
                variant="line"
                className="h-auto justify-start gap-6 p-0 pr-10 group-data-[orientation=horizontal]/tabs:h-auto"
              >
                {TABS.map((value) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="h-auto flex-none cursor-pointer px-0 py-1 font-unbounded text-base font-semibold tracking-tight text-zinc-muted/70 after:bg-accent hover:text-foreground/90 data-[state=active]:text-foreground sm:text-lg dark:text-zinc-muted/70"
                  >
                    <span>{value === "signin" ? t("signIn") : t("signUp")}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="signin" className="mt-7">
                <SignInForm onSuccess={() => close()} onForgotPassword={() => setView("reset")} />
              </TabsContent>

              <TabsContent value="signup" className="mt-7">
                <SignUpForm onSuccess={() => close()} />
              </TabsContent>

              <div className="mt-5">
                <ContinueWithGoogle />
              </div>
            </Tabs>
          : <div className="flex flex-1 flex-col">
              <ResetPasswordForm onCancel={returnToSignIn} onComplete={close} />

              <Button
                type="button"
                size="none"
                className="mt-6 w-fit text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                onClick={returnToSignIn}
              >
                <span>{t("reset.backToSignIn")}</span>
              </Button>
            </div>
          }
        </section>
      </DialogContent>
    </Dialog>
  );
}
