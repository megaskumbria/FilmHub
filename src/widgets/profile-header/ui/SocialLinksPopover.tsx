import { useTranslations } from "next-intl";
import { Link2, Plus, X } from "lucide-react";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
} from "@/shared/ui";
import { SocialLinkIcon } from "./SocialLinkIcon";

const MAX_SOCIAL_LINKS = 4;

interface Props {
  links: string[];
  onChange: (links: string[]) => void;
}

export const SocialLinksPopover = ({ links, onChange }: Props) => {
  const t = useTranslations("collections.profile");

  const handleUpdateLink = (index: number, url: string): void => {
    onChange(links.map((link, i) => (i === index ? url : link)));
  };

  const handleRemoveLink = (index: number): void => onChange(links.filter((_, i) => i !== index));

  const handleAddLink = (): void => onChange([...links, ""]);

  const isLimitReached = links.length >= MAX_SOCIAL_LINKS;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="subtle" size="sm" className="h-9 gap-2 rounded-full px-4">
          <Link2 className="size-4" />
          <span className="text-sm whitespace-nowrap">{t("editLinks")}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-2xl border-border bg-surface p-4 sm:w-80"
      >
        <PopoverHeader className="mb-4 border-b border-dashed border-border pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background text-zinc-muted">
                <Link2 className="size-4" />
              </span>
              <PopoverTitle className="text-sm font-medium tracking-tight text-foreground">
                {t("socialLinks")}
              </PopoverTitle>
            </div>
          </div>
        </PopoverHeader>

        <div className="flex flex-col gap-2">
          {links.map((url, index) => (
            <div
              key={index}
              className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-background/60 p-2 transition-colors hover:border-zinc-muted/70 focus-within:border-zinc-muted/70"
            >
              <div className="flex shrink-0 items-center gap-2">
                <span className="w-5 text-center font-mono text-xs tabular-nums text-zinc-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <SocialLinkIcon
                  url={url}
                  className="size-9 rounded-lg border border-border bg-surface"
                />
              </div>

              <Input
                variant="neutral"
                placeholder="https://..."
                value={url}
                onChange={(e) => handleUpdateLink(index, e.target.value)}
                className="h-9 px-0 flex-1 border-transparent bg-transparent text-xs text-foreground shadow-none focus-visible:border-transparent focus-visible:bg-transparent focus-visible:ring-0"
              />

              <Button
                variant="transparent"
                size="icon-sm"
                onClick={() => handleRemoveLink(index)}
                className="size-8 hover:bg-surface-elevated shrink-0 rounded-lg text-zinc-muted transition-colors hover:text-destructive focus-visible:ring-2 focus-visible:ring-gold/40"
              >
                <X className="size-4 transition-colors" />
              </Button>
            </div>
          ))}

          {links.length === 0 && (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="relative grid size-10 place-items-center rounded-lg border border-border bg-background text-zinc-muted">
                <Link2 className="size-4" />
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-gold/80" />
              </span>
              <p className="mt-3 text-sm font-medium text-foreground">{t("noLinks")}</p>
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-dashed border-border pt-3">
          <Button
            type="button"
            variant="subtle"
            size="sm"
            disabled={isLimitReached}
            onClick={handleAddLink}
            className="h-10 w-full justify-center gap-2 rounded-xl border-border bg-background text-sm font-medium text-foreground transition-colors hover:border-zinc-muted hover:text-foreground disabled:cursor-not-allowed"
          >
            <Plus className="size-4 text-gold/80" />
            <span>{isLimitReached ? t("maxLinks") : t("addLink")}</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
