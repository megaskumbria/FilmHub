"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useAuthStore } from "@/features/auth";
import { useChangeEmailSchema, type ChangeEmailSchema } from "../model/change-email-schema";
import { isEmailTakenError, useChangeEmail } from "../lib/useChangeEmail";

export const ChangeEmailForm = () => {
  const t = useTranslations("settings.security");
  const changeEmailSchema = useChangeEmailSchema();
  const storedEmail = useAuthStore((state) => state.user.email) ?? "";

  const { mutate: changeEmail, isPending: isChangingEmail } = useChangeEmail();

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: storedEmail },
    mode: "onChange",
  });

  useEffect(() => form.reset({ email: storedEmail }), [storedEmail, form]);

  const handleSubmitForm = (data: ChangeEmailSchema): void => {
    changeEmail(data.email, {
      onError: (error) => {
        if (!isEmailTakenError(error)) return;
        form.setError("email", { message: t("emailTaken") });
      },
    });
  };

  const emailUnchanged = form.watch("email").trim() === storedEmail;
  const shouldDisableButton = emailUnchanged || !form.formState.isValid || isChangingEmail;

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-28 shrink-0 text-sm text-zinc-muted text-right">
                {t("email")}
              </FormLabel>

              <div className="min-w-0 flex-1">
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      variant="neutral"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      className={cn(
                        "h-9 text-sm",
                        fieldState.invalid
                          && "border-destructive/60 focus-visible:border-destructive/80",
                      )}
                      {...field}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={shouldDisableButton}
                    className="shrink-0 rounded-lg border-border px-4 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span>{isChangingEmail ? t("saving") : t("save")}</span>
                  </Button>
                </div>

                <FormMessage className="mt-1.5" />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
