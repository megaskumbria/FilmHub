import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { Button } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateFolderSchema } from "../model/create-folder-schema";

interface Props {
  form: UseFormReturn<CreateFolderSchema>;
}

export const FolderColorPicker = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="color"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
            Color
          </FormLabel>

          <FormControl>
            <div className="grid grid-cols-10 gap-1.5 justify-items-center">
              {COLOR_PRESETS.map(({ hex, label }, i) => (
                <Button
                  type="button"
                  key={i}
                  title={label}
                  onClick={() => field.onChange(hex)}
                  className={cn(
                    "size-7 rounded-full transition-all duration-150",
                    field.value !== hex && "opacity-60 hover:opacity-90 hover:scale-105",
                    field.value === hex && "scale-105",
                  )}
                  style={{
                    backgroundColor: hex,
                  }}
                />
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
