"use client";

import type { ReactNode } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useDeleteProfileCover } from "@/shared/hooks";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";

interface Props {
  children: ReactNode;
}

export const DeleteCover = ({ children }: Props) => {
  const t = useTranslations("collections.profile");
  const { mutate: deleteCover, isPending } = useDeleteProfileCover();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-w-[min(23.75rem,calc(100%-2rem))] gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl sm:max-w-95"
      >
        <header className="relative flex items-end overflow-hidden border-b border-red-500/15 bg-red-500/[0.07] px-6 pt-10 pb-6">
          <IconAlertTriangle
            className="absolute -right-3 -bottom-4 size-28 -rotate-12 text-red-500/10"
            strokeWidth={1.5}
          />

          <div className="relative flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/15">
              <IconAlertTriangle className="size-5 text-red-400" stroke={1.75} />
            </div>

            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-base leading-tight font-semibold text-foreground">
                {t("deleteCoverTitle")}
              </DialogTitle>
              <p className="text-sm text-zinc-muted">{t("deleteCoverHint")}</p>
            </div>
          </div>
        </header>

        <DialogDescription className="px-6 py-5 text-sm leading-relaxed text-zinc-muted">
          {t("deleteCoverBody")}
        </DialogDescription>

        <footer className="flex items-center justify-end gap-2 px-6 pb-5">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="h-9 rounded-xl border-border px-4 text-sm font-medium text-foreground hover:bg-white/5"
            >
              <span>{t("cancel")}</span>
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={() => deleteCover()}
            disabled={isPending}
            className="h-9 min-w-20 rounded-xl border-0 bg-red-500 px-4 text-sm font-semibold text-white hover:bg-red-600"
          >
            <span>{isPending ? t("deletingCover") : t("deleteCoverAction")}</span>
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};
