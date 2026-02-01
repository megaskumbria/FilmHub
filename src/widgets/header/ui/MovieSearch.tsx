// import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Button } from "@/shared/ui";

export function MovieSearch() {
  // const t = useTranslations();

  return (
    <form className="flex items-center gap-2">
      {/* <Input className="border border-gray-300" type="search" placeholder={t("Search movies")} /> */}
      <Button type="button" variant="outline" size="icon" className="shrink-0">
        <Search className="opacity-80" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
