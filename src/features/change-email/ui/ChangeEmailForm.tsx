"use client";

import { useState } from "react";
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
import { changeEmailSchema, type ChangeEmailSchema } from "../model/change-email-schema";

export const ChangeEmailForm = () => {
  const storedEmail = useAuthStore((state) => state.user.email) ?? "";
  const [prevStoredEmail, setPrevStoredEmail] = useState(storedEmail);

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: storedEmail },
    mode: "onChange",
  });

  if (storedEmail !== prevStoredEmail) {
    setPrevStoredEmail(storedEmail);
    form.reset({ email: storedEmail });
  }

  const emailUnchanged = form.watch("email").trim() === storedEmail; // ?

  const handleSubmitForm = () => undefined;

  return (
    <Form {...form}>
      <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-28 shrink-0 text-sm text-zinc-muted text-right">
                Email
              </FormLabel>

              <div className="min-w-0 flex-1">
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      variant="neutral"
                      type="email"
                      placeholder="email@example.com"
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
                    disabled={emailUnchanged || !form.formState.isValid}
                    className="shrink-0 rounded-lg border-border px-4 text-sm text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span>Save</span>
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
