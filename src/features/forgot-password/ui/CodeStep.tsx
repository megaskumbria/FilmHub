"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "@/shared/ui";
import { ApiFieldError } from "@/shared/types/api-error-types";
import { useCodeSchema, type CodeSchema } from "../model/forgot-password-schema";
import { useForgotPassword } from "../lib/useForgotPassword";
import { fieldClassName, labelClassName, submitClassName } from "./field-classes";
import { ChangeEvent } from "react";

interface Props {
  active: boolean;
  email: string;
  onSubmit: (resetToken: string) => void;
}

export const CodeStep = ({ active, email, onSubmit }: Props) => {
  const t = useTranslations("auth");

  const schema = useCodeSchema();

  const { verifyCode } = useForgotPassword();
  const { mutate: verifyRecoveryPassword, isPending } = verifyCode;

  const form = useForm<CodeSchema>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  const handleSubmitForm = (data: CodeSchema) => {
    verifyRecoveryPassword(
      { email, code: data.code.trim() },
      {
        onSuccess: ({ resetToken }) => onSubmit(resetToken),
        onError: (error) => {
          if (!axios.isAxiosError<ApiFieldError>(error)) return;

          const { field, message } = error.response?.data ?? {};

          if (field === "code") {
            form.setError("code", { message });
            return;
          }

          form.setError("root", { message });
        },
      },
    );
  };

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    form.setValue("code", value);
  };

  return (
    <div data-step="code" hidden={!active}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => void form.handleSubmit(handleSubmitForm)(event)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className={labelClassName}>{t("reset.code")}</FormLabel>
                <FormControl>
                  <Input
                    variant="neutral"
                    inputSize="lg"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder={t("reset.codePlaceholder")}
                    maxLength={6}
                    className={fieldClassName}
                    {...field}
                    onChange={handleChangeCode}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <FormMessage className="text-sm">{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" disabled={isPending} className={submitClassName}>
            <span>{isPending ? t("reset.checkingCode") : t("reset.continue")}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
