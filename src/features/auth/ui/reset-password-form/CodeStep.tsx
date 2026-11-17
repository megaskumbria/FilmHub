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
import { useResetCodeSchema, type ResetCodeSchema } from "../../model/auth-schema";
import { useVerifyRecoveryPassword } from "../../lib/useAuth";
import { fieldClassName, labelClassName, submitClassName } from "./field-classes";

interface Props {
  active: boolean;
  email: string;
  onSubmit: (resetToken: string) => void;
}

export const CodeStep = ({ active, email, onSubmit }: Props) => {
  const t = useTranslations("auth");
  const schema = useResetCodeSchema();
  const { mutate: verifyRecoveryPassword, isPending } = useVerifyRecoveryPassword();
  const form = useForm<ResetCodeSchema>({
    resolver: zodResolver(schema),
    defaultValues: { code: "" },
  });

  const handleSubmitForm = (data: ResetCodeSchema) => {
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
                    className={fieldClassName}
                    {...field}
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
