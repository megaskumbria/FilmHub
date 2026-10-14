"use client";

import { useTranslations } from "next-intl";
import { IconExternalLink, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Separator,
} from "@/shared/ui";
import { BoostyLogoIcon } from "@/shared/icons";
import { BOOSTY_URL } from "../model/support-config";
import { CryptoDonation } from "./CryptoDonation";

export const SupportProject = () => {
  const t = useTranslations("support");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group flex h-10 w-full select-none items-center justify-start gap-3 rounded-xl px-1 text-card-foreground transition-colors hover:bg-accent/10 hover:text-accent">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent transition-colors group-hover:bg-accent/25">
            <IconHeart size={16} stroke={2} />
          </span>

          <span className="flex-1 text-left">{t("button")}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl sm:max-w-105">
        <header className="flex flex-col items-center gap-4 bg-linear-to-b from-accent/15 to-transparent px-6 pb-2 pt-6 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/30">
            <IconHeartFilled className="size-7 text-accent-foreground" />
          </div>

          <div className="flex flex-col gap-2">
            <DialogTitle className="text-xl font-semibold leading-tight text-foreground">
              {t("title")}
            </DialogTitle>

            <DialogDescription className="text-sm leading-relaxed text-zinc-muted">
              {t("description")}
            </DialogDescription>
          </div>
        </header>

        <div className="flex flex-col gap-5 px-6 pb-6 pt-4">
          <section className="flex flex-col gap-2">
            <Button
              asChild
              className="h-14 w-full justify-between rounded-xl bg-white px-5 transition-opacity hover:opacity-90"
            >
              <a href={BOOSTY_URL} target="_blank" rel="noopener noreferrer">
                <BoostyLogoIcon className="h-9 w-auto shrink-0" aria-hidden="true" />

                <div className="flex items-center gap-2" style={{ translate: "0 4px" }}>
                  <span className="flex-1 text-right text-base font-semibold text-black opacity-80">
                    {t("boosty.title")}
                  </span>

                  <IconExternalLink
                    className="size-5 shrink-0 opacity-80 text-black"
                    stroke={1.75}
                  />
                </div>
              </a>
            </Button>

            <p className="text-center text-sm text-zinc-muted">{t("boosty.hint")}</p>
          </section>

          <div className="flex items-center gap-3">
            <Separator className="h-px flex-1 bg-border" />
            <span className="text-sm text-zinc-muted">{t("or")}</span>
            <Separator className="h-px flex-1 bg-border" />
          </div>

          <CryptoDonation />
        </div>
      </DialogContent>
    </Dialog>
  );
};
