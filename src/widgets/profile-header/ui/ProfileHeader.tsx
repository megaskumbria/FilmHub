"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/ui";
import { SocialLinksPopover } from "./SocialLinksPopover";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { AnimatePresence, motion } from "framer-motion";
import {
  profileQueryOptions,
  useUpdateProfile,
  useUpdateProfileCover,
  useUpdateProfileAvatar,
  isTagTakenError,
} from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfileEditSchema, type ProfileEditSchema } from "../model/useProfileEditSchema";
import { ProfileCover } from "./ProfileCover";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileIdentity } from "./ProfileIdentity";
import { ProfileStats } from "./ProfileStats";
import { ProfileActions } from "./ProfileActions";

interface Props {
  isMyProfile: boolean;
  userId: string;
}

const filledSocialLinks = (links: string[]): string[] =>
  links.map((link) => link.trim()).filter((link) => link.length > 0);

export const ProfileHeader = ({ isMyProfile, userId }: Props) => {
  const t = useTranslations("collections.profile.validation");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  const profileEditSchema = useProfileEditSchema();

  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutateAsync: updateCover, isPending: isUpdatingCover } = useUpdateProfileCover();
  const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } = useUpdateProfileAvatar();

  const { data: profile } = useQuery(profileQueryOptions({ userId }));

  const form = useForm<ProfileEditSchema>({
    resolver: zodResolver(profileEditSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      tag: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!isMyProfile) setIsEditing(false);
  }, [isMyProfile]);

  if (!profile) return null;

  const { tag, bio, socialUrls, coverUrl, nickname } = profile;

  const handleStartEdit = (): void => {
    form.reset({ nickname, tag, bio });
    setSocialLinks(Array.isArray(socialUrls) ? socialUrls : []);
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    form.reset();
    setIsEditing(false);
  };

  const handleSubmitUpdate = async (profileData: ProfileEditSchema): Promise<void> => {
    const nextLinks = filledSocialLinks(socialLinks);

    try {
      await updateProfile({ ...profileData, socialUrls: nextLinks });
      setSocialLinks(nextLinks);
      setIsEditing(false);
    } catch (error) {
      if (!isTagTakenError(error)) throw error;

      form.setError("tag", { message: t("tagTaken") });
    }
  };

  const urls = filledSocialLinks(isEditing ? socialLinks : (socialUrls ?? []));
  const isSaving = isUpdatingAvatar || isUpdatingCover || isUpdating;

  return (
    <header className="relative overflow-hidden rounded-3xl border border-border bg-surface">
      <ProfileCover
        userId={userId}
        coverUrl={coverUrl}
        isMyProfile={isMyProfile}
        isUpdatingCover={isUpdatingCover}
        onUpdateCover={updateCover}
      />

      <div className="relative z-10 -mt-20 px-6 pb-6 sm:px-10 sm:pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
          <ProfileAvatar
            isMyProfile={isMyProfile}
            onUpdateAvatar={updateAvatar}
            isUpdatingAvatar={isUpdatingAvatar}
            profile={profile}
            isEditing={isEditing}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <ProfileIdentity
              isEditing={isEditing}
              profile={profile}
              form={form}
              handleSubmitUpdate={handleSubmitUpdate}
            />

            <div className="flex shrink-0 items-center gap-2">
              {urls.length > 0 && (
                <ul className="flex items-center gap-1.5">
                  {urls.map((url, index) => (
                    <li key={index}>
                      <Button asChild variant="subtle" size="icon" className="rounded-full">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <SocialLinkIcon url={url} className="size-5 rounded-md" />
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <SocialLinksPopover links={socialLinks} onChange={setSocialLinks} />
                  </motion.div>
                )}
              </AnimatePresence>

              {urls.length > 0 && <span className="mx-1.5 h-6 w-px bg-border" aria-hidden />}

              <ProfileActions
                user={profile}
                isEditing={isEditing}
                isSaving={isSaving}
                form={form}
                isMyProfile={isMyProfile}
                handleCancelEdit={handleCancelEdit}
                handleStartEdit={handleStartEdit}
                handleSubmitUpdate={handleSubmitUpdate}
              />
            </div>
          </div>
        </div>

        <ProfileStats profile={profile} />
      </div>
    </header>
  );
};
