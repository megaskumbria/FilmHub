import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { Button } from "@/shared/ui";

interface Props {
  selectedColor: number;
  setSelectedColor: (color: number) => void;
}

export const FolderColorPicker = ({ selectedColor, setSelectedColor }: Props) => {
  return (
    <div className="flex flex-col gap-2.5">
      <Label className="text-xs font-medium text-zinc-muted uppercase tracking-wider">Color</Label>
      <div className="grid grid-cols-10 gap-1.5 justify-items-center">
        {COLOR_PRESETS.map((preset, i) => (
          <Button
            key={i}
            title={preset.label}
            onClick={() => setSelectedColor(i)}
            className={cn(
              "size-7 rounded-full transition-all duration-150",
              selectedColor !== i && "opacity-60 hover:opacity-90 hover:scale-105",
              selectedColor === i && "scale-105",
            )}
            style={{
              backgroundColor: preset.hex,
              boxShadow:
                selectedColor === i ? `0 0 0 2px #121214, 0 0 0 4px ${preset.hex}99` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
