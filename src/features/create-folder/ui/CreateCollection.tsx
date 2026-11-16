"use client";

import { useTranslations } from "next-intl";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { CollectionPreview } from "./CollectionPreview";
import { CollectionIconPicker } from "./CollectionIconPicker";
import { CollectionColorPicker } from "./CollectionColorPicker";
import { DialogClose, Button, Form } from "@/shared/ui";
import { useForm } from "react-hook-form";
import {
  useCreateCollectionSchema,
  type CreateCollectionSchema,
} from "../model/useCreateCollectionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection, useCreateCollection, useEditCollection } from "@/shared/hooks";

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
  const iconName = form.watch("iconName");
  const colorHex = form.watch("colorHex");

  const selectedIcon = (ICONS.find((icon) => icon.iconName === iconName) ?? ICONS[0]).icon;

  const isLoading = isPending || isUpdating;
  const isEditing = Boolean(initialData);

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <CollectionPreview
          form={form}
          Icon={selectedIcon}
          iconName={iconName}
          colorHex={colorHex}
        />

        <div className="flex flex-col gap-2 px-5 pt-5 pb-6">
          <CollectionIconPicker form={form} colorHex={colorHex} />

          <CollectionColorPicker form={form} />
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-border px-5 py-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="subtle"
              size="sm"
              className="rounded-lg text-sm"
              disabled={isLoading}
            >
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className="rounded-lg text-sm font-medium"
            disabled={isLoading || collectionName.trim().length < 3}
            type="submit"
          >
            {isLoading ?
              isEditing ?
                t("editing")
              : t("creating")
            : isEditing ?
              t("edit")
            : t("create")}
          </Button>
        </footer>
      </form>
    </Form>
  );
};
