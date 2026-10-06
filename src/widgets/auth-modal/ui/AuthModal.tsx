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
} from "@/shared/ui";
import { AuthModalSignInForm, AuthModalSignUpForm, useAuthModalStore } from "@/features/auth";
import { FooterAuthModal } from "./FooterAuthModal";

const TABS = ["signin", "signup"] as const;
export type Tab = (typeof TABS)[number];

export function AuthModal() {
  const t = useTranslations("auth");
  const [tab, setTab] = useState<Tab>("signin");

  const { isOpen, open, close } = useAuthModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={(v) => (v ? open() : close())}>
      <DialogTitle className="sr-only">{t("title")}</DialogTitle>

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

          <TabsContent value="signin" className="mt-0 px-5 py-6">
            <AuthModalSignInForm onSuccess={() => close()} />
          </TabsContent>

          <TabsContent value="signup" className="mt-0 px-5 py-6">
            <AuthModalSignUpForm onSuccess={() => close()} />
          </TabsContent>
        </Tabs>

        <FooterAuthModal tab={tab} setTab={setTab} />
      </DialogContent>
    </Dialog>
  );
}
