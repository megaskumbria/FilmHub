import { useState } from "react";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { FolderNameRow } from "./FolderNameRow";
import { FolderIconPicker } from "./FolderIconPicker";
import { FolderColorPicker } from "./FolderColorPicker";
import { FolderCustomCover } from "./FolderCustomCover";

export const CreateFolder = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const selectedPreset = COLOR_PRESETS[selectedColor];
  const SelectedIcon = ICONS[selectedIcon].icon;

  return (
    <div className="px-5 py-5 flex flex-col gap-5">
      <FolderNameRow
        selectedPreset={selectedPreset}
        selectedIcon={<SelectedIcon className="text-white/80 size-7" />}
      />

      <FolderIconPicker selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />

      <FolderColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

      <FolderCustomCover />
    </div>
  );
};
