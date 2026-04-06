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
import { authModalSignInSchema, type AuthModalSignInSchema } from "../model/validation";

export function AuthModalSignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<AuthModalSignInSchema>({
    resolver: zodResolver(authModalSignInSchema),
    defaultValues: { emailOrPhone: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit((data) => console.log("signIn", data))(e)}
      >
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-foreground text-sm font-medium mb-0">
                Email or phone
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="block text-light text-sm font-medium mb-0">Password</FormLabel>
                <a href="#" className="text-accent text-xs font-medium hover:text-accent/80">
                  Forgot password?
                </a>
              </div>
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
          <span>Sign in</span>
        </Button>

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-border" />
          <span className="mx-4 shrink text-sm font-medium text-muted">or</span>
          <div className="grow border-t border-border" />
        </div>

        <Button className="active:scale-[0.98] h-11 w-full justify-center gap-3 rounded-lg border border-border bg-input font-medium text-foreground transition-all hover:bg-white/5">
          <GoogleIcon className="size-5 shrink-0" />
          <span>Continue with Google</span>
        </Button>
      </form>
    </Form>
  );
}
