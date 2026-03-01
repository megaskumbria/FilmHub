"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
import { GoogleIcon } from "@/shared/icons";
import { authModalSignUpSchema, type AuthModalSignUpSchema } from "../model";

export function AuthModalSignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthModalSignUpSchema>({
    resolver: zodResolver(authModalSignUpSchema),
    defaultValues: { emailOrPhone: "", username: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit((data) => console.log("signUp", data))(e)}
      >
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-foreground text-sm font-medium mb-0">
                Email или телефон
              </FormLabel>
              <FormControl>
                <Input
                  variant="accent"
                  inputSize="lg"
                  placeholder="example@mail.ru"
                  className="rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-foreground text-sm font-medium mb-0">
                Имя пользователя
              </FormLabel>
              <FormControl>
                <Input
                  variant="accent"
                  inputSize="lg"
                  placeholder="username"
                  className="rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-foreground text-sm font-medium mb-0">
                Пароль
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    variant="accent"
                    inputSize="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="rounded-lg pr-11"
                    {...field}
                  />
                  <Button
                    type="button"
                    size="none"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-muted hover:text-accent transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ?
                      <EyeOffIcon className="size-[18px]" />
                    : <EyeIcon className="size-[18px]" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full justify-center rounded-lg bg-accent font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98]"
        >
          <span>Зарегистрироваться</span>
        </Button>

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-border" />
          <span className="mx-4 shrink text-sm font-medium text-muted">или</span>
          <div className="grow border-t border-border" />
        </div>

        <Button
          type="button"
          className="active:scale-[0.98] h-11 w-full justify-center gap-3 rounded-lg border border-border bg-input font-medium text-foreground transition-all hover:bg-white/5"
        >
          <GoogleIcon className="size-5 shrink-0" />
          <span>Продолжить с Google</span>
        </Button>
      </form>
    </Form>
  );
}
