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
  const { fileInputRef, handleFileSelect, previewUrl, clearFile, file } = useFileSelect();

  const handleSaveCover = async (): Promise<void> => {
    if (!file) return;
    await onUpdateCover(file);
    clearFile();
  };

  const handleCancelCover = (): void => clearFile();

  const customCover = previewUrl || coverUrl || null;

  return (
    <div className="group relative h-56 w-full overflow-hidden rounded-t-2xl">
      <ProfileCoverAtmosphere userId={userId} />

      {customCover && (
        <Image src={customCover} alt="Cover" fill className="z-1 object-cover" priority />
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
          "absolute inset-0 bg-linear-to-b",
          customCover ? "from-black/20 via-black/40 to-black/70" : "from-transparent to-surface/30",
        )}
      />

      {isMyProfile && (
        <div
          className={cn(
            "absolute top-3 right-4 z-10 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            previewUrl && "opacity-100",
          )}
        >
          {previewUrl ?
            <>
              <Button
                type="button"
                size="icon"
                onClick={handleCancelCover}
                disabled={isUpdatingCover}
                className="size-8 flex justify-center items-center rounded-sm bg-black/50 border border-white/15 text-red-400 transition-all duration-200 shadow-lg hover:text-red-300 hover:border-red-400/40 disabled:opacity-50"
              >
                <X className="size-5" />
              </Button>

              <Button
                type="button"
                size="icon"
                onClick={() => void handleSaveCover()}
                disabled={isUpdatingCover}
                className="size-8 flex justify-center items-center rounded-sm bg-black/50 border border-white/15 text-emerald-400 transition-all duration-200 shadow-lg hover:text-emerald-300 hover:border-emerald-400/40"
              >
                {isUpdatingCover ?
                  <Loader2 className="size-5 animate-spin" />
                : <Check className="size-5" />}
              </Button>
            </>
          : <Button
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-lg gap-2 bg-black/50 border-white/15 text-white hover:bg-black/70"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="size-4" />
              <span className="text-sm">Change cover</span>
            </Button>
          }
        </div>
      )}
    </div>
  );
};
