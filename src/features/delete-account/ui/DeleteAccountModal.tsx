"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Eye, EyeOff } from "lucide-react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useDeleteAccountSchema, type DeleteAccountSchema } from "../model/delete-account-schema";
import { isPasswordIncorrectError, useDeleteAccount } from "../lib/useDeleteAccount";

interface Props {
  children: ReactNode;
}

export function DeleteAccountModal({ children }: Props) {
  const t = useTranslations("settings.deleteAccount");
  const deleteAccountSchema = useDeleteAccountSchema();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: deleteAccount, isPending: isDeletingAccount } = useDeleteAccount();

  const form = useForm<DeleteAccountSchema>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const handleSubmitForm = (data: DeleteAccountSchema) => {
    deleteAccount(data.password, {
      onError: (error) => {
        if (isPasswordIncorrectError(error)) {
          form.setError("password", { message: t("passwordIncorrect") });
        }
      },
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      form.reset();
      setIsPasswordVisible(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="sm:max-w-95 gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl"
      >
        <div className="relative flex items-end px-6 pt-10 pb-6 bg-red-500/[0.07] border-b border-red-500/15 overflow-hidden">
          <IconAlertTriangle
            className="absolute -right-3 -bottom-4 size-28 text-red-500/10 -rotate-12"
            strokeWidth={1.5}
          />

          <div className="relative flex items-center gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/20">
              <IconAlertTriangle className="size-5 text-red-400" stroke={1.75} />
            </div>

            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-base font-semibold text-foreground leading-tight">
                {t("confirmTitle")}
              </DialogTitle>

              <p className="text-sm text-zinc-muted">{t("cannotUndo")}</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}>
            <div className="flex flex-col gap-4 px-6 py-5">
              <p className="text-sm text-zinc-muted leading-relaxed">{t("warning")}</p>

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          variant="neutral"
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder={t("password")}
                          className={cn(
                            "h-9 pr-10 text-sm",
                            fieldState.invalid
                              && "border-destructive/60 focus-visible:border-destructive/80",
                          )}
                          {...field}
                        />

                        <Button
                          type="button"
                          onClick={() => setIsPasswordVisible((visible) => !visible)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-muted transition-colors hover:text-foreground"
                        >
                          {isPasswordVisible ?
                            <EyeOff className="size-4" />
                          : <Eye className="size-4" />}
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-2 px-6 pb-5">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 px-4 rounded-xl text-sm font-medium border-border text-foreground hover:bg-white/5"
                >
                  <span>{t("cancel")}</span>
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={!form.formState.isValid || isDeletingAccount}
                className="h-9 px-4 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white border-0 min-w-20"
              >
                <span>{isDeletingAccount ? t("deleting") : t("delete")}</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
