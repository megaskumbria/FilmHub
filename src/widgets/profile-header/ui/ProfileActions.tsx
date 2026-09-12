import { Button } from "@/shared/ui";
import { Check, Loader2, Share2, X, Pencil } from "lucide-react";
import { type ProfileEditSchema } from "../model/profile-edit-schema";
import { UseFormReturn } from "react-hook-form";

interface Props {
  isEditing: boolean;
  isSaving: boolean;
  isMyProfile: boolean;
  form: UseFormReturn<ProfileEditSchema>;
  handleStartEdit: () => void;
  handleCancelEdit: () => void;
  handleSubmitUpdate: (data: ProfileEditSchema) => Promise<unknown>;
}

export const ProfileActions = ({
  isEditing,
  isSaving,
  form,
  isMyProfile,
  handleStartEdit,
  handleCancelEdit,
  handleSubmitUpdate,
}: Props) => {
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
            <span className="text-sm">Cancel</span>
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
                <span className="text-sm">Saving...</span>
              </>
            : <>
                <Check className="size-3.5" />
                <span className="text-sm">Save</span>
              </>
            }
          </Button>
        </>
      : <>
          <Button
            type="button"
            size="sm"
            className="transition-colors rounded-lg h-9 p-0 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
          >
            <Share2 className="size-4" />
          </Button>

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
              <span className="text-sm">Edit</span>
            </Button>
          : <Button
              type="button"
              variant="accent"
              className="transition-colors rounded-md px-2.5 h-9 gap-2"
            >
              <span className="text-sm">Follow</span>
            </Button>
          }
        </>
      }
    </div>
  );
};
