import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button, SheetTrigger } from "@/shared/ui";
import { FollowersSheet } from "@/widgets";
import { type UserProfile } from "@/shared/hooks";

interface Props {
  profile: UserProfile;
}

export const ProfileStats = ({ profile }: Props) => {
  const t = useTranslations("collections.profile");
  const { filmsCount, collectionsCount, followersCount, userId } = profile;

  return (
    <ul className="mt-6 flex flex-nowrap items-start justify-between gap-x-2 border-t border-border/60 pt-4 w450:flex-wrap w450:items-center w450:justify-start w450:gap-x-5 w450:gap-y-2 sm:mt-7 sm:gap-x-8 sm:gap-y-3 sm:pt-5">
      <li className="flex min-w-0 flex-col items-center gap-0.5 w450:flex-row w450:gap-2">
        <span className="font-unbounded text-base font-semibold tabular-nums text-foreground w450:text-xl">
          {filmsCount}
        </span>
        <span className="text-center text-xs whitespace-nowrap text-zinc-muted w450:text-sm">
          {t("films", { count: filmsCount })}
        </span>
      </li>

      <li className="flex min-w-0 flex-col items-center gap-0.5 w450:flex-row w450:gap-2">
        <span className="font-unbounded text-base font-semibold tabular-nums text-foreground w450:text-xl">
          {collectionsCount}
        </span>
        <span className="text-center text-xs whitespace-nowrap text-zinc-muted w450:text-sm">
          {t("collections", { count: collectionsCount })}
        </span>
      </li>

      <li className="min-w-0">
        <FollowersSheet userId={userId}>
          <SheetTrigger asChild>
            <Button
              type="button"
              className="group p-0 -mx-1.5 min-h-11 flex-col items-center gap-0.5 rounded-xl transition-colors hover:bg-surface-elevated w450:-mx-2 w450:flex-row w450:gap-0 w450:px-2 w450:py-2.5 sm:-mx-3 sm:px-3 sm:py-1.5"
            >
              <span className="flex items-center w450:contents">
                <span className="pr-0.5 font-unbounded text-base font-semibold tabular-nums text-foreground w450:pr-2 w450:text-xl">
                  {followersCount}
                </span>
                <ChevronRight className="size-4 text-zinc-muted transition-transform group-hover:translate-x-0.5 w450:order-1 w450:size-6 w450:pl-1" />
              </span>

              <span className="text-center text-xs whitespace-nowrap text-zinc-muted transition-colors group-hover:text-foreground w450:text-sm">
                {t("followers", { count: followersCount })}
              </span>
            </Button>
          </SheetTrigger>
        </FollowersSheet>
      </li>
    </ul>
  );
};
