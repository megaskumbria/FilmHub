"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { EmailStep } from "./EmailStep";
import { CodeStep } from "./CodeStep";
import { PasswordStep } from "./PasswordStep";

const STEPS = ["email", "code", "password"] as const;
type ResetStep = (typeof STEPS)[number];

interface Props {
  onCancel: () => void;
  onComplete: () => void;
}

export const ResetPasswordForm = ({ onCancel, onComplete }: Props) => {
  const t = useTranslations("auth");
  const rootRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

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

  const stepIndex = STEPS.indexOf(step);
  const title =
    step === "email" ? t("reset.title")
    : step === "code" ? t("reset.codeTitle")
    : t("reset.passwordTitle");
  const hint =
    step === "email" ? t("reset.emailHint")
    : step === "code" ? t("reset.codeHint", { email })
    : t("reset.passwordHint");

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

      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-zinc-muted">{hint}</p>
      <p className="sr-only">{t("reset.step", { current: stepIndex + 1, total: STEPS.length })}</p>

      <div className="mt-4 flex gap-1.5" aria-hidden>
        {STEPS.map((item, index) => (
          <span
            key={item}
            className={cn(
              "h-0.5 flex-1 rounded-full",
              index <= stepIndex ? "bg-accent" : "bg-border",
            )}
          />
        ))}
      </div>

      <div className="mt-5">
        <EmailStep
          active={step === "email"}
          onSubmit={(value) => {
            setEmail(value);
            setStep("code");
          }}
        />
        <CodeStep
          active={step === "code"}
          email={email}
          onSubmit={(token) => {
            setResetToken(token);
            setStep("password");
          }}
        />
        <PasswordStep active={step === "password"} resetToken={resetToken} onSubmit={onComplete} />
      </div>
    </div>
  );
};
