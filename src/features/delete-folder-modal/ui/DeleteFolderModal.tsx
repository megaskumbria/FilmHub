"use client";

import { useState, type ReactNode } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { setSkipDeleteConfirm } from "@/shared/hooks";
import { useTranslations } from "next-intl";

interface Props {
  children: ReactNode;
  isDeleting?: boolean;
  onConfirm: () => void;
}

export function DeleteFolderModal({ children, isDeleting, onConfirm }: Props) {
  const t = useTranslations("collections.delete");
  const [isSkip, setIsSkip] = useState(false);

  const handleSkip = (checked: boolean) => setIsSkip(checked);

  const handleConfirm = () => {
    if (isSkip) setSkipDeleteConfirm(true);
    onConfirm();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-95 gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <div className="relative flex items-end px-6 pt-10 pb-6 bg-red-500/[0.07] border-b border-red-500/15 overflow-hidden">
          <IconAlertTriangle
            className="absolute -right-3 -bottom-4 size-28 text-red-500/10 -rotate-12"
            strokeWidth={1.5}
          />

          <div className="relative flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20">
              <IconAlertTriangle className="size-5 text-red-400" stroke={1.75} />
            </div>

            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-base font-semibold text-foreground leading-tight">
                {t("title")}
              </DialogTitle>

              <p className="text-sm text-zinc-muted">{t("undo")}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-6 py-5">
          <p className="text-sm text-zinc-muted leading-relaxed">{t("body")}</p>

          <label
            htmlFor="skip-confirm"
            className="flex cursor-pointer items-center gap-2.5 select-none w-fit"
          >
            <Checkbox id="skip-confirm" onCheckedChange={handleSkip} />
            <span className="text-sm text-zinc-muted">{t("skip")}</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 pb-5">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="h-9 px-4 rounded-xl text-sm font-medium border-border text-foreground hover:bg-white/5"
            >
              <span>{t("cancel")}</span>
            </Button>
          </DialogClose>

          <Button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="h-9 px-4 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white border-0 min-w-20"
          >
            <span>{isDeleting ? t("deleting") : t("delete")}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
