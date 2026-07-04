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
import { signUpSchema, type SignUpSchema } from "../model/validation";
import { useAuthStore } from "../model/auth.store";
import axios from "axios";
import { ApiErrorMessage } from "@/shared/types/api-error-types";

interface Props {
  onSuccess: () => void;
}

export const AuthModalSignUpForm = ({ onSuccess }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { signUp, isLoading } = useAuthStore();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", username: "", password: "" },
  });

  const handleSubmitForm = async (data: SignUpSchema) => {
    try {
      await signUp(data);
      onSuccess();
    } catch (e) {
      console.error(e);

      if (axios.isAxiosError<ApiErrorMessage>(e)) {
        form.setError("root", { message: e.response?.data.message });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="block text-foreground/80 text-sm font-medium mb-0 tracking-tight">
                Email
              </FormLabel>

              <FormControl>
                <Input
                  variant="neutral"
                  inputSize="lg"
                  placeholder="you@example.com"
                  className="rounded-lg bg-input/60 border-border/80 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
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
            <FormItem className="gap-1.5">
              <FormLabel className="block text-foreground/80 text-sm font-medium mb-0 tracking-tight">
                Username
              </FormLabel>

              <FormControl>
                <Input
                  variant="neutral"
                  inputSize="lg"
                  placeholder="your_username"
                  className="rounded-lg bg-input/60 border-border/80 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
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
            <FormItem className="gap-1.5">
              <FormLabel className="block text-foreground/80 text-sm font-medium mb-0 tracking-tight">
                Password
              </FormLabel>

              <FormControl>
                <div className="relative">
                  <Input
                    variant="neutral"
                    inputSize="lg"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="rounded-lg pr-11 bg-input/60 border-border/80 focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    {...field}
                  />
                  <Button
                    type="button"
                    size="none"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-zinc-muted hover:text-accent transition-colors"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ?
                      <EyeOffIcon className="size-[17px]" />
                    : <EyeIcon className="size-[17px]" />}
                  </Button>
                </div>
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <FormMessage className="text-sm">{form.formState.errors.root.message}</FormMessage>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-1 h-10 w-full justify-center rounded-lg bg-accent font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isLoading ? "Signing up..." : "Create account"}</span>
        </Button>

        <div className="relative flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-xs font-medium text-zinc-muted">or continue with</span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <Button
          type="button"
          className="active:scale-[0.98] h-10 w-full justify-center gap-2.5 rounded-lg border border-border/80 bg-transparent font-medium text-foreground/80 transition-all hover:bg-white/5 hover:border-border hover:text-foreground"
        >
          <GoogleIcon className="size-[18px] shrink-0" />
          <span>Google</span>
        </Button>
      </form>
    </Form>
  );
};
