import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui";
import { COLOR_PRESETS } from "@/widgets/create-folder-modal/model/color-presets";
import { Button } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateCollectionSchema } from "../model/create-collection-schema";

interface Props {
  form: UseFormReturn<CreateCollectionSchema>;
}

export const CollectionColorPicker = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="colorHex"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
            Color
          </FormLabel>

          <FormControl>
            <div className="grid grid-cols-10 gap-1.5 justify-items-center">
              {COLOR_PRESETS.map(({ colorHex, label }, i) => (
                <Button
                  type="button"
                  key={i}
                  title={label}
                  onClick={() => field.onChange(colorHex)}
                  className={cn(
                    "size-7 rounded-full transition-all duration-150",
                    field.value !== colorHex && "opacity-60 hover:opacity-90 hover:scale-105",
                    field.value === colorHex && "scale-105",
                  )}
                  style={{
                    backgroundColor: colorHex,
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
