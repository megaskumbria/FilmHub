import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui";
import { SETTINGS_TABS, type SettingsTab } from "../model/tabs";
import { motion } from "framer-motion";

interface Props {
  activeTab: SettingsTab;
  setActiveTab: (tabKey: SettingsTab) => void;
}

export const SettingsTabs = ({ activeTab, setActiveTab }: Props) => {
  const t = useTranslations("settings.tabs");
  const handleTabChange = (tabKey: string): void => setActiveTab(tabKey as SettingsTab);

  return (
    <div className="sticky top-16 z-10 overflow-x-auto border-b border-border bg-background px-4 py-3 scrollbar-minimal">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="relative h-11 w-max items-center justify-center gap-0.5 rounded-lg border border-border bg-graphite p-0.5">
          {SETTINGS_TABS.map((tab) => (
            <TabsTrigger
              key={tab.tabKey}
              value={tab.tabKey}
              className="relative z-10 shrink-0 cursor-pointer rounded-md px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 data-[state=active]:text-accent-foreground data-[state=inactive]:text-zinc-muted hover:text-foreground"
            >
              {activeTab === tab.tabKey && (
                <motion.div
                  layoutId="settingsPageActiveTab"
                  className="absolute inset-0 rounded-md bg-linear-to-br from-accent to-accent/80 shadow-md shadow-accent/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">
                {tab.icon}
                {t(tab.tabKey)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
