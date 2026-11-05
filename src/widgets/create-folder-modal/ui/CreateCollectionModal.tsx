"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { IconX } from "@tabler/icons-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui";
import { CreateCollection } from "@/features";
import { Collection } from "@/shared/hooks";

interface Props {
  children: ReactNode;
  isEditing: boolean;
  initialData?: Collection;
}

export function CreateCollectionModal({ children, isEditing, initialData }: Props) {
  const t = useTranslations("collections.create");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-115 gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <DialogTitle className="text-base font-semibold text-foreground">
            {isEditing ? t("editTitle") : t("new")}
          </DialogTitle>

          <DialogClose asChild>
            <Button size="none" className="p-1 text-muted hover:text-foreground transition-colors">
              <IconX className="size-5" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <CreateCollection onSuccess={() => setIsOpen(false)} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}
