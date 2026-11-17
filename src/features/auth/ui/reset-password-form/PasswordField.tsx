"use client";

import type { UseFormReturn } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import type { ResetPasswordSchema } from "../../model/auth-schema";
import { fieldClassName, labelClassName } from "./field-classes";

interface Props {
  form: UseFormReturn<ResetPasswordSchema>;
  name: "password" | "confirmPassword";
  label: string;
  visible: boolean;
  onToggle: () => void;
}

export const PasswordField = ({ form, name, label, visible, onToggle }: Props) => {
  const t = useTranslations("auth");

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-1.5">
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                variant="neutral"
                inputSize="lg"
                type={visible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className={cn(fieldClassName, "pr-11")}
                {...field}
              />
            </FormControl>
            <Button
              type="button"
              size="none"
              aria-label={visible ? t("reset.hidePassword") : t("reset.showPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-zinc-muted transition-colors hover:text-accent"
              onClick={onToggle}
            >
              {visible ?
                <EyeOffIcon className="size-4.25" />
              : <EyeIcon className="size-4.25" />}
            </Button>
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
