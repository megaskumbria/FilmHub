"use client";

import { Button } from "@/shared/ui";
import { useTranslations } from "next-intl";

import { flagModel, FlagBage } from "@/entities/flag";

export function StoryLevel() {
  const t = useTranslations();

  const flags = flagModel.getAllFlags();

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {flags.map((flag, index) => (
          <li className="" key={index}>
            <FlagBage {...flag} />
          </li>
        ))}
      </ul>

      <Button className="w-full">{t("Add flag")}</Button>
    </div>
  );
}
