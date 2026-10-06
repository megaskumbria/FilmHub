import { useTranslations } from "next-intl";
import { Lock, Shield } from "lucide-react";
import { Separator } from "@/shared/ui";
import { ChangeEmailForm, ChangePasswordForm, DeleteAccount, PrivacySettings } from "@/features";

export const AccountSettings = () => {
  const t = useTranslations("settings");

  return (
    <div className="h-full overflow-y-auto drawer-scroll">
      <div className="p-7 flex flex-col gap-8">
        <section>
          <header className="flex items-start gap-3 mb-5">
            <div className="size-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent">
                <Lock className="size-4" />
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">{t("security.title")}</p>
              <p className="text-sm text-zinc-muted mt-0.5">{t("security.description")}</p>
            </div>
          </header>

          <div className="flex flex-col gap-8">
            <ChangeEmailForm />

            <Separator />

            <ChangePasswordForm />
          </div>
        </section>

        <Separator />

        <section>
          <header className="flex items-start gap-3 mb-5">
            <div className="size-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-accent">
                <Shield className="size-4" />
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">{t("privacy.title")}</p>
            </div>
          </header>

          <PrivacySettings />
        </section>

        <Separator />

        <section>
          <DeleteAccount />
        </section>
      </div>
    </div>
  );
};
