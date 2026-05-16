import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { FolderNameRow } from "./FolderNameRow";
import { FolderIconPicker } from "./FolderIconPicker";
import { FolderColorPicker } from "./FolderColorPicker";
import { FolderCustomCover } from "./FolderCustomCover";
import { Form } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { createFolderSchema, CreateFolderSchema } from "../model/create-folder-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const CreateFolder = () => {
  const selectedPreset = COLOR_PRESETS[0];
  const SelectedIcon = ICONS[0].icon;

  const form = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
      icon: 0,
      color: 0,
    },
  });

  const handleSubmitForm = (data: CreateFolderSchema) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <div className="px-5 py-5 flex flex-col gap-5">
          <FolderNameRow selectedPreset={selectedPreset} Icon={SelectedIcon} form={form} />

          <FolderIconPicker form={form} />

          <FolderColorPicker form={form} />

          <FolderCustomCover />
        </div>
      </form>
    </Form>
  );
};
