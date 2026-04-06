import Image from "next/image";
import { Avatar, AvatarBadge, AvatarFallback, Button } from "@/shared/ui";
import { Share2, BookOpen, Film, Users, Star, LucideIcon } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "@/shared/icons";

interface IStat {
  label: string;
  value: string;
  Icon: LucideIcon;
}

const stats: IStat[] = [
  { label: "Collections", value: "17", Icon: BookOpen },
  { label: "Films", value: "248", Icon: Film },
  { label: "Followers", value: "1.2K", Icon: Users },
  { label: "Rating", value: "4.8", Icon: Star },
];

export const UserProfileHeader = () => {
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
      </div>

      <div className="bg-surface px-8 pb-6 rounded-b-2xl">
        <div className="flex items-end gap-5 -mt-2">
          <Avatar className="size-20 rounded-2xl bg-linear-to-br from-accent to-accent/60 shadow-xl shadow-accent/30 ring-4 ring-surface">
            <AvatarFallback className="text-white text-3xl font-bold rounded-2xl">P</AvatarFallback>
            <AvatarBadge className="bg-emerald-accent" />
          </Avatar>

          <div className="flex-1 min-w-0 pb-1">
            <h1 className="text-2xl font-bold text-foreground truncate">Pavel Ivanov</h1>
            <p className="text-zinc-muted text-sm">@pavel_films · Film enthusiast since 2019</p>
          </div>

          <div className="flex items-start gap-2">
            <Button
              variant="transparent"
              className="hover:scale-110 transition-transform duration-200"
            >
              <InstagramIcon className="size-8" />
            </Button>

            <Button
              variant="transparent"
              className="hover:scale-110 transition-transform duration-200"
            >
              <TelegramIcon className="size-8" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-5">
          <div className="flex items-center gap-2.5">
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-background border border-border"
              >
                <Icon className="size-4 text-zinc-muted shrink-0" />

                <span className="text-foreground font-bold text-base">{value}</span>
                <span className="text-zinc-muted text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="transition-colors rounded-lg size-9 p-0 bg-transparent border border-border text-zinc-muted hover:text-foreground hover:border-zinc-muted"
            >
              <Share2 className="size-4" />
            </Button>

            <Button variant="accent" className="transition-colors rounded-md px-2.5 h-9 gap-2">
              <span className="text-sm">Follow</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
