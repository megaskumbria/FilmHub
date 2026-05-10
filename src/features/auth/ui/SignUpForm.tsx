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
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => void form.handleSubmit(handleSubmitForm)(e)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-foreground text-sm font-medium mb-0">
                Email
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
                Username
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
                Password
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
          disabled={isLoading}
          className="h-11 w-full justify-center rounded-lg bg-accent font-bold text-accent-foreground shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isLoading ? "Signing up..." : "Sign up"}</span>
        </Button>

        <div className="relative flex items-center py-2">
          <div className="grow border-t border-border" />
          <span className="mx-4 shrink text-sm font-medium text-muted">or</span>
          <div className="grow border-t border-border" />
        </div>

        <Button
          type="button"
          className="active:scale-[0.98] h-11 w-full justify-center gap-3 rounded-lg border border-border bg-input font-medium text-foreground transition-all hover:bg-white/5"
        >
          <GoogleIcon className="size-5 shrink-0" />
          <span>Continue with Google</span>
        </Button>
      </form>
    </Form>
  );
};
