// import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui";

export const MovieSearch = () => {
  // const t = useTranslations();

  return (
    <form className="flex items-center w-full max-w-[280px] sm:max-w-[320px]">
      <label className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 size-4 text-[#a3a3a3]" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="h-9 rounded-lg border-0 bg-[#2C2C2C] pl-9 pr-3 text-[#e5e5e5] placeholder:text-[#a3a3a3] focus-visible:ring-1 focus-visible:ring-[#3F3F3F]"
        />
      </label>
    </form>
  );
};
