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
    <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4 sm:mt-7 sm:gap-x-8 sm:gap-y-3 sm:pt-5">
      <li className="flex items-center gap-2">
        <span className="font-unbounded text-xl font-semibold tabular-nums text-foreground">
          {filmsCount}
        </span>
        <span className="text-sm text-zinc-muted">{t("films", { count: filmsCount })}</span>
      </li>

      <li className="flex items-center gap-2">
        <span className="font-unbounded text-xl font-semibold tabular-nums text-foreground">
          {collectionsCount}
        </span>

        <span className="text-sm text-zinc-muted">
          {t("collections", { count: collectionsCount })}
        </span>
      </li>

      <li>
        <FollowersSheet userId={userId}>
          <SheetTrigger asChild>
            <Button
              type="button"
              className="group -mx-2 min-h-11 items-center rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-elevated sm:-mx-3 sm:px-3 sm:py-1.5"
            >
              <span className="font-unbounded text-xl pr-2 font-semibold tabular-nums text-foreground">
                {followersCount}
              </span>

              <span className="text-sm text-zinc-muted transition-colors group-hover:text-foreground">
                {t("followers", { count: followersCount })}
              </span>

              <ChevronRight className="size-6 self-center pl-1 text-zinc-muted transition-transform group-hover:translate-x-0.5" />
            </Button>
          </SheetTrigger>
        </FollowersSheet>
      </li>
    </ul>
  );
};
