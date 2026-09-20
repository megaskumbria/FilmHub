"use client";

import { Avatar, AvatarFallback, Button } from "@/shared/ui";
import { useFileSelect, UserProfile } from "@/shared/hooks";
import { Loader2, Camera } from "lucide-react";
import { useState } from "react";
import { AvatarCrop } from "@/features";
import { getAvatarColor } from "@/shared/lib";

interface Props {
  isMyProfile: boolean;
  isUpdatingAvatar: boolean;
  profile: UserProfile;
  isEditing: boolean;
  onUpdateAvatar: (file: File) => Promise<unknown>;
}

export const ProfileAvatar = ({
  isMyProfile,
  onUpdateAvatar,
  isUpdatingAvatar,
  profile,
  isEditing,
}: Props) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState<boolean>(false);

  const { avatarUrl, nickname, userId } = profile;

  const {
    fileInputRef: avatarInputRef,
    handleFileSelect: handleAvatarRawSelect,
    previewUrl: avatarRawPreview,
    clearFile: clearAvatarRawFile,
  } = useFileSelect();

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleAvatarRawSelect(e);
    setIsCropOpen(true);
  };

  const handleCropDone = (croppedFile: File): void => {
    setAvatarPreview(URL.createObjectURL(croppedFile));
    setIsCropOpen(false);
    clearAvatarRawFile();

    void onUpdateAvatar(croppedFile).finally(() => {
      setAvatarPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    });
  };

  const avatarSrc = avatarPreview || avatarUrl;
  const canEditAvatar = isMyProfile && isEditing;

  const firstAvatarLetter = nickname?.charAt(0).toUpperCase();

  return (
    <>
      <div className="relative">
        <Avatar className="size-20 rounded-2xl ">
          {avatarSrc ?
            <img src={avatarSrc} alt="" className="size-full z-1 rounded-2xl object-cover" />
          : <AvatarFallback
              className="text-white text-3xl font-bold z-1 rounded-2xl ring-4 ring-surface"
              style={{ backgroundColor: getAvatarColor(userId) }}
            >
              {firstAvatarLetter}
            </AvatarFallback>
          }
        </Avatar>

        {canEditAvatar && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              className="hidden"
              onChange={handleAvatarFileSelect}
            />

            <Button
              type="button"
              variant="accent"
              size="icon-sm"
              onClick={() => avatarInputRef.current?.click()}
              disabled={isUpdatingAvatar}
              className="absolute z-10 -bottom-1.5 -right-1.5 justify-center rounded-full ring-2 ring-surface"
            >
              {isUpdatingAvatar ?
                <Loader2 className="size-4 animate-spin" strokeWidth={3} />
              : <Camera className="size-4" strokeWidth={3} />}
            </Button>
          </>
        )}
      </div>

      {avatarRawPreview && (
        <AvatarCrop
          open={isCropOpen}
          imageUrl={avatarRawPreview}
          onOpenChange={setIsCropOpen}
          onCropDone={handleCropDone}
        />
      )}
    </>
  );
};
