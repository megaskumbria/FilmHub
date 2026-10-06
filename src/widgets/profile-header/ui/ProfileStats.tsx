import { useTranslations } from "next-intl";
import { Film, BookOpen, Users, ChevronRight } from "lucide-react";
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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Film className="size-4 text-zinc-muted shrink-0" />
          <span className="text-foreground font-bold text-base">{filmsCount}</span>
          <span className="text-zinc-muted text-sm font-medium">
            {t("films", { count: filmsCount })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="h-4 w-px bg-border" aria-hidden />

        <div className="flex items-center gap-1.5">
          <BookOpen className="size-4 text-zinc-muted shrink-0" />
          <span className="text-foreground font-bold text-base">{collectionsCount}</span>
          <span className="text-zinc-muted text-sm font-medium">
            {t("collections", { count: collectionsCount })}
          </span>
        </div>
      </div>

      <span className="h-4 w-px bg-border" aria-hidden />

      <FollowersSheet userId={userId}>
        <SheetTrigger asChild>
          <Button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
          >
            <Users className="size-4 text-zinc-muted shrink-0" />
            <span className="text-foreground font-bold text-base">{followersCount}</span>
            <span className="text-zinc-muted text-sm font-medium">
              {t("followers", { count: followersCount })}
            </span>
            <ChevronRight className="size-3.5 text-zinc-muted" />
          </Button>
        </SheetTrigger>
      </FollowersSheet>
    </div>
  );
};
