import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { Check, Loader2, X, Pencil } from "lucide-react";
import { IconUserCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { type ProfileEditSchema } from "../model/useProfileEditSchema";
import { UseFormReturn } from "react-hook-form";
import { type UserProfile, useFollowProfile } from "@/shared/hooks";
import { useRequireAuth } from "@/features/auth";
import { cn } from "@/shared/lib/utils";

interface Props {
  user: UserProfile;
  isEditing: boolean;
  isSaving: boolean;
  isMyProfile: boolean;
  form: UseFormReturn<ProfileEditSchema>;
  handleStartEdit: () => void;
  handleCancelEdit: () => void;
  handleSubmitUpdate: (data: ProfileEditSchema) => Promise<unknown>;
}

export const ProfileActions = ({
  user,
  isEditing,
  isSaving,
  form,
  isMyProfile,
  handleStartEdit,
  handleCancelEdit,
  handleSubmitUpdate,
}: Props) => {
  const t = useTranslations("collections.profile");

  const ensureAuth = useRequireAuth();
  const { mutate: followProfile } = useFollowProfile();

  const { userId: profileId, isFollowing } = user;

  const handleFollowProfile = (): void => {
    if (!ensureAuth()) return;
    followProfile(profileId);
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ?
        <>
          <Button
            type="button"
            size="sm"
            onClick={handleCancelEdit}
            className="transition-colors rounded-lg h-9 gap-1.5 px-3 border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
            disabled={isSaving}
          >
            <X className="size-3.5" />
            <span className="text-sm">{t("cancel")}</span>
          </Button>

          <Button
            key="profile-save"
            type="button"
            variant="accent"
            size="sm"
            className="transition-colors rounded-lg h-9 gap-1.5 px-3"
            onClick={() => void form.handleSubmit(handleSubmitUpdate)()}
            disabled={isSaving}
          >
            {isSaving ?
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span className="text-sm">{t("saving")}</span>
              </>
            : <>
                <Check className="size-3.5" />
                <span className="text-sm">{t("save")}</span>
              </>
            }
          </Button>
        </>
      : <>
          {isMyProfile ?
            <Button
              key="profile-edit"
              type="button"
              variant="accent"
              className="transition-colors rounded-md px-2.5 h-9 gap-2"
              onClick={handleStartEdit}
              disabled={isSaving}
            >
              <Pencil className="size-3.5" />
              <span className="text-sm">{t("edit")}</span>
            </Button>
          : <Button
              type="button"
              variant={isFollowing ? undefined : "accent"}
              className={cn(
                "group transition-colors rounded-lg px-3 h-9 gap-2",
                isFollowing
                  && "border border-border bg-background text-zinc-muted hover:border-zinc-muted hover:text-foreground",
              )}
              onClick={handleFollowProfile}
            >
              {isFollowing ?
                <>
                  <IconUserCheck className="size-4 group-hover:hidden" />
                  <IconUserMinus className="size-4 hidden group-hover:block" />
                  <span className="relative min-w-28 text-center">
                    <span className="text-sm group-hover:invisible">{t("following")}</span>
                    <span className="absolute inset-0 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100">
                      {t("unfollow")}
                    </span>
                  </span>
                </>
              : <>
                  <IconUserPlus className="size-4" />
                  <span className="text-sm">{t("follow")}</span>
                </>
              }
            </Button>
          }
        </>
      }
    </div>
  );
};
