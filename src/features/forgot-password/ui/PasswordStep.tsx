"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Button, Form, FormMessage } from "@/shared/ui";
import { ApiFieldError } from "@/shared/types/api-error-types";
import {
  useForgotPasswordSchema,
  type ForgotPasswordSchema,
} from "../model/forgot-password-schema";
import { useForgotPassword } from "../lib/useForgotPassword";
import { PasswordField } from "./PasswordField";
import { submitClassName } from "./field-classes";

interface Props {
  active: boolean;
  resetToken: string;
  onSubmit: () => void;
}

export const PasswordStep = ({ active, resetToken, onSubmit }: Props) => {
  const t = useTranslations("auth");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const schema = useForgotPasswordSchema();

  const { resetPassword } = useForgotPassword();
  const { mutate: savePassword, isPending } = resetPassword;

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleSubmitForm = (data: ForgotPasswordSchema) => {
    savePassword(
      { resetToken, newPassword: data.password },
      {
        onSuccess: () => onSubmit(),
        onError: (error) => {
          if (!axios.isAxiosError<ApiFieldError>(error)) return;

          const { field, message } = error.response?.data ?? {};

          if (field === "newPassword") {
            form.setError("password", { message });
            return;
          }

          form.setError("root", { message });
        },
      },
    );
  };

  return (
    <div data-step="password" hidden={!active}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => void form.handleSubmit(handleSubmitForm)(event)}
        >
          <PasswordField
            form={form}
            name="password"
            label={t("reset.newPassword")}
            visible={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
          />

          <PasswordField
            form={form}
            name="confirmPassword"
            label={t("reset.repeatPassword")}
            visible={showConfirm}
            onToggle={() => setShowConfirm((current) => !current)}
          />

          {form.formState.errors.root && (
            <FormMessage className="text-sm">{form.formState.errors.root.message}</FormMessage>
          )}

          <Button type="submit" disabled={isPending} className={submitClassName}>
            <span>{isPending ? t("reset.saving") : t("reset.saveAndSignIn")}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
