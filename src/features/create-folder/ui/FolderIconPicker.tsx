import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui";
import { ICONS } from "@/widgets/create-folder-modal/model/icons";
import { Button } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateFolderSchema } from "../model/create-folder-schema";

interface Props {
  form: UseFormReturn<CreateFolderSchema>;
}

export const FolderIconPicker = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name="icon"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2.5">
          <FormLabel className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
            Icon
          </FormLabel>

          <FormControl className="grid grid-cols-8 justify-items-center gap-1.5 max-h-50 overflow-y-auto scrollbar-minimal">
            {ICONS.map(({ icon: Icon, label }, i) => (
              <Button
                key={i}
                title={label}
                onClick={() => field.onChange(i)}
                className={cn(
                  "size-11 rounded-lg flex items-center justify-center transition-all duration-150",
                  "border text-muted hover:text-foreground",
                  field.value === i ?
                    "bg-accent/15 border-accent/50 text-accent"
                  : "bg-surface border-border hover:bg-surface-elevated",
                )}
                {...field}
              >
                <Icon className="size-6" />
              </Button>
            ))}
          </FormControl>
        </FormItem>
      )}
    />
  );
};
