import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/shared/ui";

export const LangToggle = () => {
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const detectedLanguage = locale === "ru" ? "En" : "Ru";

  const handleToggleLang = () => {
    const newLocale = detectedLanguage.toLowerCase();
    const newPath = pathname.replace(/^\/(ru|en)/, `/${newLocale}`);

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <Button
      onClick={handleToggleLang}
      className="p-2.5! h-[38px] w-[38px] text-white flex items-center justify-center"
    >
      {detectedLanguage}
    </Button>
  );
};
