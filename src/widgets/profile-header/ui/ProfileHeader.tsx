"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, Button, Input, SheetTrigger } from "@/shared/ui";
import {
  ImagePlus,
  Share2,
  Pencil,
  BookOpen,
  Film,
  Users,
  ChevronRight,
  LucideIcon,
  Check,
  X,
} from "lucide-react";
import { FollowersSheet } from "@/widgets/followers-sheet";
import { SocialLinksPopover, type SocialLink } from "./SocialLinksPopover";
import { SocialLinkIcon } from "./SocialLinkIcon";
import { AnimatePresence, motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  Icon: LucideIcon;
}

const infoStats: Stat[] = [
  { label: "Collections", value: "17", Icon: BookOpen },
  { label: "Films", value: "248", Icon: Film },
];

const followersStat: Stat = { label: "Followers", value: "1.2K", Icon: Users };

interface ProfileFields {
  name: string;
  username: string;
  bio: string;
  socialLinks: SocialLink[];
}

const myProfileFields: ProfileFields = {
  name: "Pavel",
  username: "pavel_films",
  bio: "Film enthusiast since 2019",
  socialLinks: [
    { id: "instagram", url: "https://instagram.com/pavel_films" },
    { id: "telegram", url: "https://t.me/pavel_films" },
  ],
};

const otherProfileFields: ProfileFields = {
  name: "John Doe",
  username: "john_doe",
  bio: "placeholder bio",
  socialLinks: [],
};

interface Props {
  isMyProfile: boolean;
}

export const ProfileHeader = ({ isMyProfile }: Props) => {
  const [fields, setFields] = useState<ProfileFields>(
    isMyProfile ? myProfileFields : otherProfileFields,
  );
  const [isEditing, setIsEditing] = useState(false);
  const snapshotRef = useRef<ProfileFields>(fields);

  const handleStartEditing = () => {
    snapshotRef.current = fields;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFields(snapshotRef.current);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <header className="flex flex-col rounded-2xl border border-border">
      <div className="group relative h-56 w-full">
        <Image
          src="/images/mock-slider-5.jpg"
          alt="Cover"
          fill
          className="object-cover object-center rounded-t-2xl"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/80" />

        {isMyProfile && (
          <div className="absolute top-3 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
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
              {fields.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 pb-1">
            <AnimatePresence initial={false} mode="popLayout">
              {isEditing ?
                <Input
                  variant="ghost"
                  value={fields.name}
                  onChange={(e) => setFields((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-auto w-full max-w-xs rounded-none border-0 border-b border-border/60 p-0 text-2xl md:text-2xl font-bold text-foreground focus-visible:border-accent focus-visible:ring-0"
                />
              : <h1 className="text-2xl font-bold text-foreground truncate">{fields.name}</h1>}

              {isEditing ?
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="text-zinc-muted text-sm shrink-0">@</span>
                  <Input
                    variant="ghost"
                    value={fields.username}
                    onChange={(e) => setFields((prev) => ({ ...prev, username: e.target.value }))}
                    className="h-auto w-28 shrink-0 rounded-none border-0 border-b border-transparent p-0 text-sm text-zinc-muted md:text-sm focus-visible:border-accent focus-visible:text-foreground focus-visible:ring-0"
                  />

                  <span className="text-zinc-muted/40 shrink-0">·</span>

                  <Input
                    variant="ghost"
                    value={fields.bio}
                    onChange={(e) => setFields((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Add a short bio..."
                    className="h-auto min-w-0 flex-1 rounded-none border-0 border-b border-transparent p-0 text-sm text-zinc-muted md:text-sm focus-visible:border-accent focus-visible:text-foreground focus-visible:ring-0"
                  />
                </div>
              : <p className="text-zinc-muted text-sm">
                  @{fields.username}
                  {fields.bio && ` · ${fields.bio}`}
                </p>
              }
            </AnimatePresence>
          </div>

          <div className="flex items-start gap-2">
            {fields.socialLinks.map((link) => (
              <Button
                key={link.id}
                asChild
                variant="transparent"
                className="hover:scale-110 transition-transform duration-200"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <SocialLinkIcon url={link.url} className="size-8" />
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
                  <SocialLinksPopover
                    links={fields.socialLinks}
                    onChange={(socialLinks) => setFields((prev) => ({ ...prev, socialLinks }))}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-5">
          <div className="flex items-center gap-4">
            {infoStats.map(({ label, value, Icon }, index) => (
              <div key={label} className="flex items-center gap-4">
                {index > 0 && <span className="h-4 w-px bg-border" aria-hidden />}

                <div className="flex items-center gap-1.5">
                  <Icon className="size-4 text-zinc-muted shrink-0" />
                  <span className="text-foreground font-bold text-base">{value}</span>
                  <span className="text-zinc-muted text-sm font-medium">{label}</span>
                </div>
              </div>
            ))}

            <span className="h-4 w-px bg-border" aria-hidden />

            <FollowersSheet defaultTab="followers">
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors">
                  <followersStat.Icon className="size-4 text-zinc-muted shrink-0" />
                  <span className="text-foreground font-bold text-base">{followersStat.value}</span>
                  <span className="text-zinc-muted text-sm font-medium">{followersStat.label}</span>
                  <ChevronRight className="size-3.5 text-zinc-muted" />
                </button>
              </SheetTrigger>
            </FollowersSheet>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ?
              <>
                <Button
                  size="sm"
                  onClick={handleCancel}
                  className="transition-colors rounded-lg h-9 gap-1.5 px-3 border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
                >
                  <X className="size-3.5" />
                  <span className="text-sm">Cancel</span>
                </Button>

                <Button
                  variant="accent"
                  size="sm"
                  onClick={handleSave}
                  className="transition-colors rounded-lg h-9 gap-1.5 px-3"
                >
                  <Check className="size-3.5" />
                  <span className="text-sm">Save</span>
                </Button>
              </>
            : <>
                <Button
                  size="sm"
                  className="transition-colors rounded-lg h-9 p-0 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
                >
                  <Share2 className="size-4" />
                </Button>

                {isMyProfile ?
                  <Button
                    variant="accent"
                    className="transition-colors rounded-md px-2.5 h-9 gap-2"
                    onClick={handleStartEditing}
                  >
                    <Pencil className="size-3.5" />
                    <span className="text-sm">Edit</span>
                  </Button>
                : <Button
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
