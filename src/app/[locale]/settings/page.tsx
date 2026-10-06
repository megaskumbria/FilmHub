"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui";
import { AccountSettings, ZonesPanel, CardPreview, SettingsTabs } from "@/widgets";
import { SETTINGS_TABS, type SettingsTab } from "@/widgets/settings-tabs";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const [activeTab, setActiveTab] = useState<SettingsTab>(SETTINGS_TABS[0].tabKey);

  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col bg-background pt-16">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <Button
          onClick={() => router.back()}
          size="icon-sm"
          className="shrink-0 rounded-lg border border-border text-zinc-muted transition-colors hover:border-zinc-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Button>

        <h1 className="text-base font-semibold text-foreground">{t("title")}</h1>
      </header>

      <main className="flex-1">
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "account" && (
          <div className="w-full max-w-2xl">
            <AccountSettings />
          </div>
        )}

        {activeTab === "movie-card" && (
          <div className="flex flex-col md:grid md:grid-cols-[20rem_1fr] md:border-t md:border-border">
            <ZonesPanel className="border-r-0 md:border-r" />
            <CardPreview />
          </div>
        )}
      </main>
    </div>
  );
}
