import { Button } from "@/shared/ui";
import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

// TODO: вынести этот компонент... куда-нибудь?

export function LangToggler() {
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
}
