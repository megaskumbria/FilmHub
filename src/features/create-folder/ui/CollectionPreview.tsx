import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, Input } from "@/shared/ui";
import { CreateCollectionSchema } from "../model/useCreateCollectionSchema";

export const COLLECTION_NAME_MAX = 50;

const posterSlots = [
  { x: -30, rotate: -8 },
  { x: 30, rotate: 8 },
];

interface Props {
  form: UseFormReturn<CreateCollectionSchema>;
  Icon: TablerIcon;
  iconName: string;
  colorHex: string;
}

export const CollectionPreview = ({ form, Icon, iconName, colorHex }: Props) => {
  const t = useTranslations("collections.create");

  return (
    <section className="relative px-8 pt-6 pb-2">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-8 h-36 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: `${colorHex}33` }}
      />

      <div className="relative pt-3">
        <div
          aria-hidden
          className="absolute top-0 left-4 h-3 w-16 rounded-t-md border-t border-x bg-surface transition-colors duration-300"
          style={{ borderColor: `${colorHex}99` }}
        />

        <div
          className="relative overflow-hidden rounded-b-xl rounded-tr-xl border transition-[border-color,box-shadow] duration-300"
          style={{
            borderColor: `${colorHex}99`,
            boxShadow: `0 8px 28px ${colorHex}40`,
          }}
        >
          <div className="relative h-36 overflow-hidden bg-surface">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60 transition-[background] duration-300"
              style={{
                background: `linear-gradient(to top, color-mix(in srgb, ${colorHex} 30%, black) 0%, color-mix(in srgb, ${colorHex} 15%, black) 100%)`,
              }}
            />

            {posterSlots.map(({ x, rotate }, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="h-28 w-20 rounded-md border border-dashed border-white/15 bg-white/3"
                  style={{ transform: `translateX(${x}px) rotate(${rotate}deg) scale(0.88)` }}
                />
              </div>
            ))}

            <div aria-hidden className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative flex h-28 w-20 scale-96 items-center justify-center overflow-hidden rounded-md shadow-xl ring-1 ring-white/10 transition-colors duration-300"
                style={{ backgroundColor: `color-mix(in srgb, ${colorHex} 38%, black)` }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={iconName}
                    initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  >
                    <Icon className="size-9 text-white" strokeWidth={1.5} />
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute top-2.5 left-2.5 flex size-7 items-center justify-center rounded-lg bg-black/40 ring-1 ring-white/10">
              <Icon className="size-4 transition-colors duration-300" style={{ color: colorHex }} />
            </div>
          </div>

          <FormField
            control={form.control}
            name="collectionName"
            render={({ field }) => {
              const nameLength = field.value.length;

              return (
                <FormItem className="flex items-center gap-3 bg-surface px-3.5 py-2.5">
                  <FormLabel className="sr-only">{t("name")}</FormLabel>

                  <FormControl>
                    <Input
                      variant="bare"
                      inputSize="none"
                      autoComplete="off"
                      maxLength={COLLECTION_NAME_MAX}
                      placeholder={t("namePlaceholder")}
                      {...field}
                    />
                  </FormControl>

                  <span
                    className={cn(
                      "shrink-0 text-xs tabular-nums transition-colors",
                      nameLength >= COLLECTION_NAME_MAX ? "text-gold" : "text-zinc-muted",
                    )}
                  >
                    {nameLength}/{COLLECTION_NAME_MAX}
                  </span>
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
};
