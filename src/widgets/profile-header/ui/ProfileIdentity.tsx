import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/shared/ui";
import { UseFormReturn } from "react-hook-form";
import { sanitizeTag, type ProfileEditSchema } from "../model/useProfileEditSchema";
import { type UserProfile } from "@/shared/hooks";

interface Props {
  isEditing: boolean;
  profile: UserProfile;
  form: UseFormReturn<ProfileEditSchema>;
  handleSubmitUpdate: (data: ProfileEditSchema) => Promise<unknown>;
}

export const ProfileIdentity = ({ isEditing, form, handleSubmitUpdate, profile }: Props) => {
  const t = useTranslations("collections.profile");
  const { nickname, tag, bio } = profile;

  const handleTagChange = (value: string): void => {
    const sanitized = sanitizeTag(value);

    form.setValue("tag", sanitized, { shouldDirty: true, shouldValidate: false });

    if (value === sanitized) {
      if (form.getFieldState("tag").error) form.clearErrors("tag");
      return;
    }

    form.setError("tag", { type: "charset", message: t("validation.tagCharset") });
  };

  return (
    <div className="min-w-0 flex-1">
      {isEditing ?
        <Form {...form}>
          <form
            onSubmit={(e) => void form.handleSubmit(handleSubmitUpdate)(e)}
            className="flex max-w-xl flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormControl>
                    <Input
                      variant="underline"
                      inputSize="none"
                      maxLength={24}
                      {...field}
                      className="pb-1 font-unbounded text-3xl font-bold tracking-tight text-foreground md:text-4xl"
                    />
                  </FormControl>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-zinc-muted">@</span>

                    <FormControl>
                      <Input
                        variant="underline"
                        inputSize="none"
                        maxLength={16}
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        {...field}
                        onChange={(event) => handleTagChange(event.target.value)}
                        className="w-40 pb-0.5 text-sm text-zinc-muted md:text-sm focus-visible:text-foreground"
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormControl>
                    <Input
                      variant="underline"
                      inputSize="none"
                      placeholder={t("bioPlaceholder")}
                      {...field}
                      className="pb-0.5 text-sm text-zinc-light md:text-sm"
                    />
                  </FormControl>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      : <>
          <h1 className="truncate font-unbounded text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {nickname}
          </h1>

          <p className="mt-1 text-sm font-medium text-zinc-muted">@{tag}</p>

          {bio && (
            <p className="min-w-0 wrap-break-word mt-2 max-w-xl text-sm leading-relaxed text-zinc-light/85">
              {bio}
            </p>
          )}
        </>
      }
    </div>
  );
};
