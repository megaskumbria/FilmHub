import { useTranslations } from "next-intl";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared/ui";
import { ComponentType } from "react";
import { CreateCollectionSchema } from "../model/useCreateCollectionSchema";
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
  const t = useTranslations("collections.create");

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
              {t("name")}
            </FormLabel>

            <FormControl>
              <Input
                variant="neutral"
                inputSize="default"
                placeholder={t("namePlaceholder")}
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
