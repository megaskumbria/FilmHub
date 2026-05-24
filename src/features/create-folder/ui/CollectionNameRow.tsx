import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/ui";
import { ComponentType } from "react";
import { CreateCollectionSchema } from "../model/create-collection-schema";
import { UseFormReturn } from "react-hook-form";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

interface Props {
  selectedPreset: string;
  Icon: ComponentType<IconProps>;
  form: UseFormReturn<CreateCollectionSchema>;
}

export const CollectionNameRow = ({ selectedPreset, Icon, form }: Props) => {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="shrink-0 size-16 rounded-xl border overflow-hidden relative flex items-center justify-center"
        style={{
          background: `linear-gradient(to top, ${selectedPreset}18, ${selectedPreset}55)`,
          borderColor: `${selectedPreset}66`,
        }}
      >
        <Icon className="size-7" strokeWidth={1.5} />
      </div>

      <FormField
        control={form.control}
        name="collectionName"
        render={({ field }) => (
          <FormItem className="flex-1 flex flex-col gap-1.5">
            <FormLabel className="text-xs font-medium text-zinc-muted uppercase tracking-wider">
              Name
            </FormLabel>

            <FormControl>
              <Input
                variant="neutral"
                inputSize="default"
                placeholder="e.g. Favorite thrillers"
                {...field}
              />
            </FormControl>

            <FormMessage className="text-xs text-destructive" />
          </FormItem>
        )}
      />
    </div>
  );
};
