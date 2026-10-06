"use client";

import { useTranslations } from "next-intl";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { CollectionNameRow } from "./CollectionNameRow";
import { CollectionIconPicker } from "./CollectionIconPicker";
import { CollectionColorPicker } from "./CollectionColorPicker";
import { CollectionCustomCover } from "./CollectionCustomCover";
import { DialogClose, Button, Form } from "@/shared/ui";
import { useForm } from "react-hook-form";
import {
  useCreateCollectionSchema,
  type CreateCollectionSchema,
} from "../model/useCreateCollectionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection, useCreateCollection, useEditCollection } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  onSuccess: () => void;
  initialData?: Collection;
}

export const CreateCollection = ({ onSuccess, initialData }: Props) => {
  const t = useTranslations("collections.create");
  const createCollectionSchema = useCreateCollectionSchema();

  const form = useForm<CreateCollectionSchema>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      collectionName: initialData?.collectionName ?? "",
      iconName: initialData?.iconName ?? ICONS[0].iconName,
      colorHex: initialData?.colorHex ?? COLOR_PRESETS[0].colorHex,
    },
  });

  const { mutate: createCollection, isPending } = useCreateCollection();
  const { mutate: updateCollection, isPending: isUpdating } = useEditCollection();

  const handleSubmitForm = (data: CreateCollectionSchema) => {
    if (initialData) {
      updateCollection({ id: initialData.id, data }, { onSuccess });
    } else {
      createCollection(data, { onSuccess });
    }
  };

  const collectionName = form.watch("collectionName");
  const iconNameField = form.watch("iconName");
  const selectedColorHex = form.watch("colorHex");

  const selectedPreset = selectedColorHex;
  const selectedIcon = (ICONS.find(({ iconName }) => iconName === iconNameField) ?? ICONS[0]).icon;

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <div className="px-5 py-5 flex flex-col gap-5">
          <CollectionNameRow selectedPreset={selectedPreset} Icon={selectedIcon} form={form} />

          <CollectionIconPicker form={form} />

          <CollectionColorPicker form={form} />

          <CollectionCustomCover />
        </div>

        <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              size="sm"
              className="border border-border rounded-lg text-sm text-muted hover:text-foreground"
              disabled={isPending}
            >
              <span>{t("cancel")}</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className={cn(
              "rounded-lg text-sm transition-all duration-150",
              collectionName.trim().length < 3 && "opacity-50 pointer-events-none",
              (isUpdating || isPending) && "opacity-50 pointer-events-none",
            )}
            disabled={isPending || isUpdating}
            type="submit"
          >
            {isPending ?
              <span className="font-medium">{isUpdating ? t("editing") : t("creating")}</span>
            : <span className="font-medium">{initialData ? t("edit") : t("create")}</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
