import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { Check, ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/shared/ui";
import Image from "next/image";
import { useFileSelect } from "@/shared/hooks";
import { ProfileCoverAtmosphere } from "./ProfileCoverAtmosphere";

interface Props {
  userId: string;
  coverUrl: string | null;
  isMyProfile: boolean;
  isUpdatingCover: boolean;
  onUpdateCover: (file: File) => Promise<unknown>;
}

export const ProfileCover = ({
  userId,
  coverUrl,
  isMyProfile,
  isUpdatingCover,
  onUpdateCover,
}: Props) => {
  const t = useTranslations("collections.profile");
  const { fileInputRef, handleFileSelect, previewUrl, clearFile, file } = useFileSelect();

  const handleSaveCover = async (): Promise<void> => {
    if (!file) return;
    await onUpdateCover(file);
    clearFile();
  };

  const handleCancelCover = (): void => clearFile();

  const customCover = previewUrl || coverUrl || null;

  return (
    <div className="group relative h-56 w-full overflow-hidden sm:h-72">
      <ProfileCoverAtmosphere userId={userId} />

      {customCover && (
        <Image src={customCover} alt={t("cover")} fill className="z-1 object-cover" priority />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      <div
        className={cn(
          "absolute inset-0 z-2 bg-linear-to-b",
          customCover ?
            "from-black/30 via-surface/30 via-55% to-surface"
          : "from-transparent via-surface/20 via-55% to-surface",
        )}
      />

      {isMyProfile && (
        <div
          className={cn(
            "absolute top-4 right-4 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 sm:top-5 sm:right-5",
            previewUrl && "opacity-100",
          )}
        >
          {previewUrl ?
            <>
              <Button
                type="button"
                variant="glass"
                size="icon"
                onClick={handleCancelCover}
                disabled={isUpdatingCover}
                aria-label={t("cancel")}
                className="rounded-full text-red-300 hover:text-red-200"
              >
                <X className="size-4.5" />
              </Button>

              <Button
                type="button"
                variant="glass"
                size="icon"
                onClick={() => void handleSaveCover()}
                disabled={isUpdatingCover}
                aria-label={t("save")}
                className="rounded-full text-emerald-300 hover:text-emerald-200"
              >
                {isUpdatingCover ?
                  <Loader2 className="size-4.5 animate-spin" />
                : <Check className="size-4.5" />}
              </Button>
            </>
          : <Button
              type="button"
              variant="glass"
              size="sm"
              className="h-9 rounded-full gap-2 px-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="size-4" />
              <span className="text-sm">{t("changeCover")}</span>
            </Button>
          }
        </div>
      )}
    </div>
  );
};
