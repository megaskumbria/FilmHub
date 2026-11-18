"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { EmailStep } from "./EmailStep";
import { CodeStep } from "./CodeStep";
import { PasswordStep } from "./PasswordStep";

type ResetStep = "email" | "code" | "password";

interface Step {
  id: ResetStep;
  title: string;
  hint: string;
  render: () => ReactNode;
}

interface Props {
  onCancel: () => void;
  onComplete: () => void;
}

export const ForgotPasswordForm = ({ onCancel, onComplete }: Props) => {
  const t = useTranslations("auth");

  const rootRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  const STEPS: Step[] = [
    {
      id: "email",
      title: t("reset.title"),
      hint: t("reset.emailHint"),
      render: () => (
        <EmailStep
          active={step === "email"}
          onSubmit={(value) => {
            setEmail(value);
            setStep("code");
          }}
        />
      ),
    },
    {
      id: "code",
      title: t("reset.codeTitle"),
      hint: t("reset.codeHint", { email }),
      render: () => (
        <CodeStep
          active={step === "code"}
          email={email}
          onSubmit={(token) => {
            setResetToken(token);
            setStep("password");
          }}
        />
      ),
    },
    {
      id: "password",
      title: t("reset.passwordTitle"),
      hint: t("reset.passwordHint"),
      render: () => (
        <PasswordStep active={step === "password"} resetToken={resetToken} onSubmit={onComplete} />
      ),
    },
  ];

  useEffect(() => {
    const input = rootRef.current?.querySelector<HTMLInputElement>(`[data-step="${step}"] input`);
    input?.focus();
  }, [step]);

  const handleBack = () => {
    if (step === "code") {
      setStep("email");
      return;
    }

    if (step === "password") {
      setStep("code");
      return;
    }

    onCancel();
  };

  const stepIndex = STEPS.findIndex((item) => item.id === step);
  const currentStep = STEPS[stepIndex];

  return (
    <div ref={rootRef}>
      <Button
        type="button"
        size="none"
        className="mb-4 inline-flex w-fit items-center gap-1 text-xs font-medium text-zinc-muted transition-colors hover:text-foreground"
        onClick={handleBack}
      >
        <IconArrowLeft className="size-3.5" />
        <span>{t("reset.back")}</span>
      </Button>

      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
        {currentStep.title}
      </h2>

      <p className="mt-1 text-sm text-zinc-muted">{currentStep.hint}</p>

      <p className="sr-only">{t("reset.step", { current: stepIndex + 1, total: STEPS.length })}</p>

      <div className="mt-4 flex gap-1.5" aria-hidden>
        {STEPS.map((item, index) => (
          <span
            key={item.id}
            className={cn(
              "h-0.5 flex-1 rounded-full",
              index <= stepIndex ? "bg-accent" : "bg-border",
            )}
          />
        ))}
      </div>

      <div className="mt-5">
        {STEPS.map((item) => (
          <Fragment key={item.id}>{item.render()}</Fragment>
        ))}
      </div>
    </div>
  );
};
