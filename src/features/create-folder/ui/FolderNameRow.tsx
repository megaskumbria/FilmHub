import { Input, Label } from "@/shared/ui";
import { ColorPreset } from "@/widgets/create-folder-modal/model/color-presets";
import { ReactNode, useState } from "react";

interface Props {
  selectedPreset: ColorPreset;
  selectedIcon: ReactNode;
}

export const FolderNameRow = ({ selectedPreset, selectedIcon }: Props) => {
  const [folderName, setFolderName] = useState("");

  return (
    <div className="flex gap-4 items-start">
      <div
        className="shrink-0 size-16 rounded-xl border overflow-hidden relative flex items-center justify-center"
        style={{
          background: `linear-gradient(to top, ${selectedPreset.hex}18, ${selectedPreset.hex}55)`,
          borderColor: `${selectedPreset.hex}66`,
        }}
      >
        {selectedIcon}
      </div>

      <div className="flex-1 flex flex-col gap-1.5">
        <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">Name</Label>
        <Input
          variant="neutral"
          inputSize="default"
          placeholder="e.g. Favorite thrillers"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
    </div>
  );
};
