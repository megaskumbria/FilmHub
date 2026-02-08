"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
} from "@/shared/ui";
import {
  authModalSignInSchema,
  authModalSignUpSchema,
  type AuthModalSignInSchema,
  type AuthModalSignUpSchema,
} from "@/features/auth/model";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AuthModalSignInForm() {
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-muted-foreground text-sm font-medium">
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
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-muted-foreground text-sm font-medium">Пароль</FormLabel>
              <FormControl>
                <Input
                  variant="accent"
                  inputSize="lg"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-11 rounded-lg bg-accent font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:ring-accent"
        >
          Войти
        </Button>
        <div className="relative py-1">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/80" />
          </span>
          <span className="relative flex justify-center">
            <span className="bg-background px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              или
            </span>
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2.5 rounded-lg border-border/80 font-medium transition-colors hover:bg-muted/50 hover:border-border"
        >
          <GoogleIcon className="shrink-0" />
          Войти через Google
        </Button>
      </form>
    </Form>
  );
}

function AuthModalSignUpForm() {
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-muted-foreground text-sm font-medium">
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-muted-foreground text-sm font-medium">
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
            <FormItem className="space-y-1.5">
              <FormLabel className="text-muted-foreground text-sm font-medium">Пароль</FormLabel>
              <FormControl>
                <Input
                  variant="accent"
                  inputSize="lg"
                  type="password"
                  placeholder="••••••••"
                  className="rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-11 rounded-lg bg-accent font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:ring-accent"
        >
          Зарегистрироваться
        </Button>
        <div className="relative py-1">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/80" />
          </span>
          <span className="relative flex justify-center">
            <span className="bg-background px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              или
            </span>
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2.5 rounded-lg border-border/80 font-medium transition-colors hover:bg-muted/50 hover:border-border"
        >
          <GoogleIcon className="shrink-0" />
          Войти через Google
        </Button>
      </form>
    </Form>
  );
}

type AuthModalProps = {
  children: React.ReactNode;
};

export function AuthModal({ children }: AuthModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px] gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-xl">
        <Tabs defaultValue="signin" className="w-full">
          <TabsList
            variant="line"
            className="w-full bg-transparent border-b border-border rounded-none h-auto p-0 gap-0"
          >
            <TabsTrigger
              value="signin"
              className="flex-1 rounded-none border-b-2 border-transparent py-3.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:bg-transparent"
            >
              Войти
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="flex-1 rounded-none border-b-2 border-transparent py-3.5 text-sm font-medium text-muted-foreground transition-colors data-[state=active]:border-accent data-[state=active]:text-foreground data-[state=active]:bg-transparent"
            >
              Зарегистрироваться
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-0 px-6 pb-6 pt-6">
            <AuthModalSignInForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-0 px-6 pb-6 pt-6">
            <AuthModalSignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
