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
import { ApiErrorMessage } from "@/shared/types/api-error-types";
import { useResetEmailSchema, type ResetEmailSchema } from "../../model/auth-schema";
import { useForgotPassword } from "../../lib/useAuth";
import { fieldClassName, labelClassName, submitClassName } from "./field-classes";

interface Props {
  active: boolean;
  onSubmit: (email: string) => void;
}

export const EmailStep = ({ active, onSubmit }: Props) => {
  const t = useTranslations("auth");
  const schema = useResetEmailSchema();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const form = useForm<ResetEmailSchema>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const handleSubmitForm = (data: ResetEmailSchema) => {
    const email = data.email.trim();

    forgotPassword(email, {
      onSuccess: () => onSubmit(email),
      onError: (error) => {
        if (!axios.isAxiosError<ApiErrorMessage>(error)) return;
        form.setError("root", { message: error.response?.data.message });
      },
    });
  };

  return (
    <div data-step="email" hidden={!active}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => void form.handleSubmit(handleSubmitForm)(event)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-1.5">
                <FormLabel className={labelClassName}>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    variant="neutral"
                    inputSize="lg"
                    type="email"
                    autoComplete="email"
                    placeholder={t("emailPlaceholder")}
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
            <span>{isPending ? t("reset.sendingCode") : t("reset.sendCode")}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
