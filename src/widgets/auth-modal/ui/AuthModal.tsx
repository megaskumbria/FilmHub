"use client";

import { ReactNode, useState } from "react";
import { Film, X } from "lucide-react";
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
        className="sm:max-w-[440px] gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-2">
            <Film className="size-7 text-accent" />
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight">FilmHub</h2>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              size="none"
              className="p-1 text-muted hover:text-foreground transition-colors"
            >
              <X className="size-6" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "signin" | "signup")}
          className="w-full gap-0"
        >
          <TabsList className="flex w-full group-data-[orientation=horizontal]/tabs:h-auto h-auto rounded-none p-0 bg-transparent border-b border-border">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="cursor-pointer flex-1 h-auto rounded-none border-0 border-b-2 border-transparent px-2 py-3.5 text-sm font-bold tracking-wide text-muted dark:text-muted transition-colors hover:text-foreground dark:hover:text-foreground data-[state=active]:border-accent data-[state=active]:text-accent dark:data-[state=active]:text-accent data-[state=active]:bg-transparent after:hidden"
              >
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="signin" className="mt-0 p-6">
            <AuthModalSignInForm />
          </TabsContent>

          <TabsContent value="signup" className="mt-0 p-6">
            <AuthModalSignUpForm onSuccess={() => setOpenDialog(false)} />
          </TabsContent>
        </Tabs>

        <FooterAuthModal tab={tab} setTab={setTab} />
      </DialogContent>
    </Dialog>
  );
}
