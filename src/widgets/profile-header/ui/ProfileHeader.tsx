"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  SheetTrigger,
} from "@/shared/ui";
import {
  ImagePlus,
  Share2,
  Pencil,
  BookOpen,
  Film,
  Users,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { FollowersSheet } from "@/widgets";
import { SocialLinksPopover } from "./SocialLinksPopover";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { AnimatePresence, motion } from "framer-motion";
import { profileQueryOptions } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileEditSchema, type ProfileEditSchema } from "../model/profile-edit-schema";

interface Props {
  isMyProfile: boolean;
  userId: string;
}

export const ProfileHeader = ({ isMyProfile, userId }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  const { data: profile } = useQuery(profileQueryOptions({ userId }));

  const {
    tag,
    bio,
    socialUrls,
    avatarUrl,
    coverUrl,
    nickname,
    filmsCount,
    collectionsCount,
    followersCount,
  } = profile ?? {};

  const form = useForm<ProfileEditSchema>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      nickname: "",
      tag: "",
      bio: "",
    },
  });

  const handleStartEdit = (): void => {
    form.reset({ nickname, tag, bio });
    setSocialLinks(Array.isArray(socialUrls) ? socialUrls : []);
    setIsEditing(true);
  };

  const handleCancelEdit = (): void => {
    form.reset();
    setIsEditing(false);
  };

  const handleSubmitEdit = (values: ProfileEditSchema): void => {
    console.log(values);
    setIsEditing(false);
  };

  return (
    <header className="flex flex-col rounded-2xl border border-border">
      <div className="group relative h-56 w-full">
        <Image
          src={coverUrl ?? "/images/mock-slider-5.jpg"}
          alt="Cover"
          fill
          className="object-cover object-center rounded-t-2xl"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

        {isMyProfile && (
          <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="rounded-lg gap-2 bg-black/50 border-white/15 text-white hover:bg-black/70"
            >
              <ImagePlus className="size-4" />
              <span className="text-sm">Change cover</span>
            </Button>
          </div>
        )}
      </div>

      <div className="bg-surface px-8 pb-6 rounded-b-2xl">
        <div className="flex items-end gap-5 -mt-2">
          <Avatar className="size-20 rounded-2xl bg-linear-to-br from-accent to-accent/60 shadow-xl shadow-accent/30 ring-4 ring-surface">
            <AvatarFallback className="text-white text-3xl font-bold rounded-2xl">
              {nickname?.charAt(0).toUpperCase()}
            </AvatarFallback>

            <AvatarImage src={avatarUrl ?? ""} />
          </Avatar>

          <div className="flex-1 min-w-0 pb-1">
            {isEditing ?
              <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(handleSubmitEdit)(e)}>
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
                              placeholder="Add a short bio..."
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

          <div className="flex items-start gap-2">
            {socialUrls?.map((url) => (
              <Button
                key={url}
                asChild
                variant="transparent"
                className="hover:scale-110 transition-transform duration-200"
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <SocialLinkIcon url={url} className="size-8" />
                </a>
              </Button>
            ))}

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
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Film className="size-4 text-zinc-muted shrink-0" />
                <span className="text-foreground font-bold text-base">{filmsCount}</span>
                <span className="text-zinc-muted text-sm font-medium">Films</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-4 w-px bg-border" aria-hidden />

              <div className="flex items-center gap-1.5">
                <BookOpen className="size-4 text-zinc-muted shrink-0" />
                <span className="text-foreground font-bold text-base">{collectionsCount}</span>
                <span className="text-zinc-muted text-sm font-medium">Collections</span>
              </div>
            </div>

            <span className="h-4 w-px bg-border" aria-hidden />

            <FollowersSheet defaultTab="followers">
              <SheetTrigger asChild>
                <Button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors"
                >
                  <Users className="size-4 text-zinc-muted shrink-0" />
                  <span className="text-foreground font-bold text-base">{followersCount}</span>
                  <span className="text-zinc-muted text-sm font-medium">Followers</span>
                  <ChevronRight className="size-3.5 text-zinc-muted" />
                </Button>
              </SheetTrigger>
            </FollowersSheet>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ?
              <>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="transition-colors rounded-lg h-9 gap-1.5 px-3 border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
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
                  onClick={() => void form.handleSubmit(handleSubmitEdit)()}
                >
                  <Check className="size-3.5" />
                  <span className="text-sm">Save</span>
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
        </div>
      </div>
    </header>
  );
};
