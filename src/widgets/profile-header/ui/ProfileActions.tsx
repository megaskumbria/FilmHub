import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { Check, Loader2, X, Pencil } from "lucide-react";
import { IconUserCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import { type ProfileEditSchema } from "../model/useProfileEditSchema";
import { UseFormReturn } from "react-hook-form";
import { type UserProfile, useFollowProfile } from "@/shared/hooks";
import { useRequireAuth } from "@/features/auth";

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
            variant="subtle"
            size="sm"
            onClick={handleCancelEdit}
            className="h-9 gap-1.5 rounded-full px-4"
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
            className="h-9 gap-1.5 rounded-full px-4"
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
              variant="subtle"
              className="h-9 gap-2 rounded-full px-4"
              onClick={handleStartEdit}
              disabled={isSaving}
            >
              <Pencil className="size-3.5" />
              <span className="text-sm">{t("edit")}</span>
            </Button>
          : <Button
              type="button"
              variant={isFollowing ? "subtle" : "accent"}
              className="group h-9 gap-2 rounded-full px-4"
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
