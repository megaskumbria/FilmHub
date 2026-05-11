"use client";

import { ReactNode, useState } from "react";
import { Clapperboard, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui";
import { AuthModalSignInForm } from "@/features/auth/ui/SignInForm";
import { AuthModalSignUpForm } from "@/features/auth/ui/SignUpForm";
import { FooterAuthModal } from "./FooterAuthModal";

interface Tab {
  label: string;
  value: "signin" | "signup";
}

const TABS: Tab[] = [
  {
    label: "Sign in",
    value: "signin",
  },
  {
    label: "Sign up",
    value: "signup",
  },
];

interface Props {
  children: ReactNode;
}

export function AuthModal({ children }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [tab, setTab] = useState<Tab["value"]>("signin");

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogTitle className="sr-only">Authentication</DialogTitle>

      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="sm:max-w-[420px] gap-0 overflow-hidden rounded-2xl border border-border bg-surface p-0 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7),0_0_0_1px_rgba(155,86,240,0.06)]"
      >
        <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-accent/10 ring-1 ring-accent/20">
              <Clapperboard className="size-[18px] text-accent" strokeWidth={1.75} aria-hidden />
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

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "signin" | "signup")}
          className="w-full gap-0"
        >
          <TabsList className="flex w-full group-data-[orientation=horizontal]/tabs:h-auto h-auto rounded-none p-0 bg-transparent border-b border-border/60">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className="cursor-pointer flex-1 h-auto rounded-none border-0 border-b-2 border-transparent px-2 py-3 text-sm font-medium tracking-wide text-zinc-muted dark:text-zinc-muted transition-all hover:text-foreground data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:bg-transparent after:hidden"
              >
                <span>{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="signin" className="mt-0 px-5 py-6">
            <AuthModalSignInForm onSuccess={() => setOpenDialog(false)} />
          </TabsContent>

          <TabsContent value="signup" className="mt-0 px-5 py-6">
            <AuthModalSignUpForm onSuccess={() => setOpenDialog(false)} />
          </TabsContent>
        </Tabs>

        <FooterAuthModal tab={tab} setTab={setTab} />
      </DialogContent>
    </Dialog>
  );
}
