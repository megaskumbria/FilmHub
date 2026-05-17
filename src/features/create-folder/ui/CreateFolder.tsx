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
import { useCreateFolder } from "@/shared/hooks";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export const CreateFolder = () => {
  const form = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
      icon: ICONS[0].name,
      color: COLOR_PRESETS[0].hex,
    },
  });

  const { mutate: createFolder, isPending } = useCreateFolder();

  const handleSubmitForm = (data: CreateFolderSchema) => createFolder(data);

  const name = form.watch("name");
  const iconName = form.watch("icon");
  const colorHex = form.watch("color");

  const selectedPreset = colorHex;
  const selectedIcon = (ICONS.find(({ name }) => name === iconName) ?? ICONS[0]).icon;

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
              variant="secondary"
              size="sm"
              className="rounded-lg text-sm text-muted hover:text-foreground"
              disabled={isPending}
            >
              <span>Cancel</span>
            </Button>
          </DialogClose>

          <Button
            variant="accent"
            size="sm"
            className={cn(
              "rounded-lg text-sm",
              name.length < 3 && "opacity-50 pointer-events-none",
              "transition-all duration-150",
            )}
            disabled={isPending}
            type="submit"
          >
            {isPending ?
              <Loader2 className="size-4 animate-spin" />
            : <span className="font-medium">Create collection</span>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
