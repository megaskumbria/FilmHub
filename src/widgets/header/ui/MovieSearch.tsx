import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Button, Input } from "@/shared/ui";

export function MovieSearch() {
  const t = useTranslations();

  return (
    <form className="flex justify-center items-center gap-2">
      <Input className="border border-gray-300" type="search" placeholder={t("Search movies")} />
      <Button className="cursor-pointer border border-gray-300">
        <Search />
      </Button>
    </form>
  );
}
