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

      <PopoverContent align="end" className="w-80 rounded-xl border-border bg-surface">
        <PopoverHeader className="mb-3">
          <PopoverTitle className="text-sm text-foreground">{t("socialLinks")}</PopoverTitle>
        </PopoverHeader>

        <div className="flex flex-col gap-2">
          {links.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <SocialLinkIcon
                url={url}
                className="size-9 shrink-0 rounded-lg border border-border bg-background"
              />

              <Input
                variant="neutral"
                placeholder="https://..."
                value={url}
                onChange={(e) => handleUpdateLink(index, e.target.value)}
                className="h-9 text-sm"
              />

              <Button
                size="icon-sm"
                className="shrink-0 rounded-lg text-zinc-muted hover:text-destructive transition-colors"
                onClick={() => handleRemoveLink(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}

          {links.length === 0 && (
            <p className="py-2 text-center text-sm text-zinc-muted">{t("noLinks")}</p>
          )}
        </div>

        <Button
          size="sm"
          disabled={isLimitReached}
          onClick={handleAddLink}
          className="mt-3 w-full justify-center gap-1.5 rounded-lg border border-border text-sm text-zinc-muted hover:text-foreground hover:border-zinc-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <Plus className="size-3.5" />
          <span>{isLimitReached ? t("maxLinks") : t("addLink")}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
