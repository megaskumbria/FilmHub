import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { FolderNameRow } from "./FolderNameRow";
import { FolderIconPicker } from "./FolderIconPicker";
import { FolderColorPicker } from "./FolderColorPicker";
import { FolderCustomCover } from "./FolderCustomCover";
import { DialogClose, Button, Form } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { createFolderSchema, CreateFolderSchema } from "../model/create-folder-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFolder, useCreateFolder, useEditFolder } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";

interface Props {
  onSuccess: () => void;
  initialData?: IFolder;
}

export const CreateFolder = ({ onSuccess, initialData }: Props) => {
  const form = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      id: initialData?.id ?? undefined,
      folderName: initialData?.folderName ?? "",
      iconName: initialData?.iconName ?? ICONS[0].iconName,
      colorHex: initialData?.colorHex ?? COLOR_PRESETS[0].colorHex,
    },
  });

  const { mutate: createFolder, isPending } = useCreateFolder();
  const { mutate: updateFolder, isPending: isUpdating } = useEditFolder();

  const handleSubmitForm = (data: CreateFolderSchema) => {
    console.log(initialData);
    if (initialData) {
      updateFolder({ id: initialData.id, data }, { onSuccess });
    } else {
      createFolder(data, { onSuccess });
    }
  };

  const folderName = form.watch("folderName");
  const iconNameField = form.watch("iconName");
  const selectedColorHex = form.watch("colorHex");

  const selectedPreset = selectedColorHex;
  const selectedIcon = (ICONS.find(({ iconName }) => iconName === iconNameField) ?? ICONS[0]).icon;

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <div className="px-5 py-5 flex flex-col gap-5">
          <FolderNameRow selectedPreset={selectedPreset} Icon={selectedIcon} form={form} />

          <FolderIconPicker form={form} />

          <FolderColorPicker form={form} />

          <FolderCustomCover />
        </div>

        <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              size="sm"
              className="border border-border rounded-lg text-sm text-muted hover:text-foreground"
              disabled={isPending}
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className={cn(
              "rounded-lg text-sm transition-all duration-150",
              folderName.trim().length < 3 && "opacity-50 pointer-events-none",
              (isUpdating || isPending) && "opacity-50 pointer-events-none",
            )}
            disabled={isPending || isUpdating}
            type="submit"
          >
            {isPending ?
              <span className="font-medium">{isUpdating ? "Editing..." : "Creating..."}</span>
            : <span className="font-medium">{initialData ? "Edit" : "Create"}</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
