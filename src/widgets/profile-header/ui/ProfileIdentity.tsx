import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { type ProfileEditSchema } from "../model/profile-edit-schema";
import { type UserProfile } from "@/shared/hooks";

interface Props {
  isEditing: boolean;
  profile: UserProfile;
  form: UseFormReturn<ProfileEditSchema>;
  handleSubmitUpdate: (data: ProfileEditSchema) => Promise<unknown>;
}

export const ProfileIdentity = ({ isEditing, form, handleSubmitUpdate, profile }: Props) => {
  const t = useTranslations("profile");
  const { nickname, tag, bio } = profile;

  return (
    <div className="flex-1 min-w-0 pb-1">
      {isEditing ?
        <Form {...form}>
          <form onSubmit={(e) => void form.handleSubmit(handleSubmitUpdate)(e)}>
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormControl>
                    <Input
                      variant="ghost"
                      maxLength={24}
                      {...field}
                      className="h-auto w-full max-w-xs rounded-none border-0 border-b border-border/60 p-0 text-2xl md:text-2xl font-bold text-foreground focus-visible:border-accent focus-visible:ring-0"
                    />
                  </FormControl>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-1.5 mt-1.5">
              <span className="text-zinc-muted text-sm shrink-0 pt-0.5">@</span>

              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem className="flex w-28 shrink-0 flex-col gap-1">
                    <FormControl>
                      <Input
                        variant="ghost"
                        maxLength={16}
                        {...field}
                        className="h-auto w-28 shrink-0 rounded-none border-0 border-b border-border/60 p-0 text-sm text-zinc-muted md:text-sm focus-visible:border-accent focus-visible:text-foreground focus-visible:ring-0"
                      />
                    </FormControl>

                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <span className="text-zinc-muted/40 shrink-0 pt-0.5">·</span>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex min-w-0 flex-1 flex-col gap-1">
                    <FormControl>
                      <Input
                        variant="ghost"
                        maxLength={100}
                        placeholder={t("bioPlaceholder")}
                        {...field}
                        className="h-auto w-full max-w-xs rounded-none border-0 border-b border-border/60 p-0 text-sm text-foreground placeholder:text-zinc-muted/60 focus-visible:border-accent focus-visible:ring-0"
                      />
                    </FormControl>

                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      : <>
          <h1 className="text-2xl font-bold text-foreground truncate">{nickname}</h1>

          <p className="text-zinc-muted text-sm">
            @{tag}
            {bio && ` · ${bio}`}
          </p>
        </>
      }
    </div>
  );
};
