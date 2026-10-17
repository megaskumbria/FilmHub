"use client";

import { useTranslations } from "next-intl";
import { IconExternalLink } from "@tabler/icons-react";
import { Button, Separator } from "@/shared/ui";
import { BoostyLogoIcon } from "@/shared/icons";
import { BOOSTY_URL } from "../model/support-config";
import { CryptoDonation } from "./CryptoDonation";

export const SupportOptions = () => {
  const t = useTranslations("support");

  return (
    <div className="flex flex-col gap-5">
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

              <IconExternalLink className="size-5 shrink-0 opacity-80 text-black" stroke={1.75} />
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
  );
};
