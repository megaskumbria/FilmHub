"use client";

import { useTranslations } from "next-intl";
import { IconAlertTriangle, IconCheck, IconCopy } from "@tabler/icons-react";
import { Button, Input, Label } from "@/shared/ui";
import { UsdtIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/utils";
import { useCopyToClipboard } from "@/shared/hooks";
import { USDT_TRC20_ADDRESS } from "../model/support-config";

export const CryptoDonation = () => {
  const t = useTranslations("support.crypto");
  const { copied, copy } = useCopyToClipboard({
    success: t("copied"),
    error: t("copyFailed"),
  });

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <header className="flex items-center gap-3">
        <UsdtIcon className="size-8 shrink-0" />

        <h3 className="text-base font-semibold leading-tight text-foreground">{t("title")}</h3>

        <span className="ml-auto rounded-md bg-secondary px-2 py-1 text-sm font-medium text-zinc-light">
          {t("network")}
        </span>
      </header>

      <Label htmlFor="usdt-trc20-address" className="sr-only">
        {t("addressLabel")}
      </Label>

      <Input
        id="usdt-trc20-address"
        readOnly
        variant="neutral"
        value={USDT_TRC20_ADDRESS}
        className="h-10 rounded-lg border-border select-none bg-background text-center font-mono text-sm text-foreground"
      />

      <Button
        type="button"
        onClick={() => void copy(USDT_TRC20_ADDRESS)}
        className={cn(
          "h-10 w-full gap-2 rounded-xl border text-sm font-medium transition-colors duration-200",
          copied ?
            "border-success/30 bg-success/10 text-success"
          : "border-border bg-secondary/50 text-foreground hover:border-accent/50 hover:bg-accent/10",
        )}
      >
        {copied ?
          <IconCheck className="size-4" />
        : <IconCopy className="size-4" />}
        <span>{copied ? t("copied") : t("copy")}</span>
      </Button>

      <p className="flex items-start gap-2 text-sm leading-snug text-zinc-muted">
        <IconAlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" stroke={1.75} />
        <span>{t("warning")}</span>
      </p>
    </section>
  );
};
