"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { FormControl, FormField, FormItem } from "@/shared/ui";
import {
  ICON_CATEGORIES,
  ICONS,
  type IconCategory,
} from "@/widgets/create-folder-modal/model/icons";
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { CreateCollectionSchema } from "../model/useCreateCollectionSchema";

interface Props {
  form: UseFormReturn<CreateCollectionSchema>;
  colorHex: string;
}

export const CollectionIconPicker = ({ form, colorHex }: Props) => {
  const t = useTranslations("collections.create");
  const indicatorId = useId();

  const [category, setCategory] = useState<IconCategory>(
    () =>
      ICONS.find(({ iconName }) => iconName === form.getValues("iconName"))?.category
      ?? ICON_CATEGORIES[0],
  );

  return (
    <FormField
      control={form.control}
      name="iconName"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3">
          <MotionConfig reducedMotion="user">
            <Tabs
              value={category}
              onValueChange={(value) => setCategory(value as IconCategory)}
              className="gap-3"
            >
              <header className="flex items-end justify-between gap-4">
                <TabsList className="h-auto gap-3.5 rounded-none bg-transparent p-0">
                  {ICON_CATEGORIES.map((value) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="relative h-auto flex-none cursor-pointer rounded-none border-0 bg-transparent px-0 pt-0 pb-1.5 text-sm leading-none font-medium text-zinc-muted shadow-none after:hidden hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:text-zinc-muted dark:hover:text-foreground dark:data-[state=active]:text-foreground"
                    >
                      {t(`iconCategories.${value}`)}

                      {category === value && (
                        <motion.span
                          layoutId={indicatorId}
                          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-foreground"
                          transition={{ type: "spring", stiffness: 480, damping: 34 }}
                        />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </header>

              <AnimatePresence mode="wait" initial={false}>
                <TabsContent key={category} value={category} forceMount asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <FormControl>
                      <div className="grid min-h-34 grid-cols-8 content-start justify-items-center gap-1.5">
                        {ICONS.filter((icon) => icon.category === category).map(
                          ({ icon: Icon, label, iconName }) => {
                            const isSelected = field.value === iconName;

                            return (
                              <Button
                                type="button"
                                variant="picker"
                                size="icon-lg"
                                key={iconName}
                                title={label}
                                onClick={() => field.onChange(iconName)}
                                style={
                                  isSelected ?
                                    {
                                      borderColor: `${colorHex}99`,
                                      backgroundColor: `color-mix(in srgb, ${colorHex} 22%, transparent)`,
                                    }
                                  : undefined
                                }
                              >
                                <Icon className="size-5.5" strokeWidth={1.75} />
                              </Button>
                            );
                          },
                        )}
                      </div>
                    </FormControl>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </MotionConfig>
        </FormItem>
      )}
    />
  );
};
