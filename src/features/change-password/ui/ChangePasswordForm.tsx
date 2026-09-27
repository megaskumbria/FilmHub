"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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
import { changePasswordSchema, type ChangePasswordSchema } from "../model/change-password-schema";
import { passwordFields } from "../model/password-fields";

type PasswordField = keyof ChangePasswordSchema;

export const ChangePasswordForm = () => {
  const [visibleField, setVisibleField] = useState<PasswordField | null>(null);

  const toggleVisibility = (field: PasswordField): void => {
    setVisibleField((current) => (current === field ? null : field));
  };

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    mode: "onChange",
  });

  const handleSubmitForm = () => undefined;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}
      >
        {passwordFields.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
              const showError =
                name === "confirmPassword" ? field.value.length > 0 : fieldState.isDirty;
              const showInvalidBorder =
                name !== "currentPassword" && fieldState.invalid && showError;

              return (
                <FormItem className="flex items-center gap-4">
                  <FormLabel className="w-28 shrink-0 text-right text-sm text-zinc-muted">
                    {label}
                  </FormLabel>

                  <div className="min-w-0 flex-1">
                    <FormControl>
                      <div className="relative">
                        <Input
                          variant="neutral"
                          type={visibleField === name ? "text" : "password"}
                          placeholder={placeholder}
                          className={cn(
                            "h-9 pr-10 text-sm",
                            showInvalidBorder
                              && "border-destructive/60 focus-visible:border-destructive/80",
                          )}
                          {...field}
                        />

                        <Button
                          onClick={() => toggleVisibility(name)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-muted transition-colors hover:text-foreground"
                        >
                          {visibleField === name ?
                            <EyeOff className="size-4" />
                          : <Eye className="size-4" />}
                        </Button>
                      </div>
                    </FormControl>

                    {showError && <FormMessage className="mt-1.5" />}
                  </div>
                </FormItem>
              );
            }}
          />
        ))}

        <div className="mt-1 flex justify-end">
          <Button
            type="submit"
            variant="accent"
            size="sm"
            disabled={!form.formState.isValid}
            className="rounded-lg px-5 text-sm"
          >
            <span>Update password</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
