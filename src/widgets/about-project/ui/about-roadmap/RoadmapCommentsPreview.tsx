import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";

export const RoadmapCommentsPreview = async () => {
  const t = await getTranslations("about.roadmap.items.comments.preview");

  const messages = [
    {
      key: "first",
      name: t("firstName"),
      text: t("firstText"),
      rowClass: "self-start",
      avatarClass: "bg-accent/30 text-accent",
      bubbleClass: "rounded-tl-sm bg-surface",
    },
    {
      key: "second",
      name: t("secondName"),
      text: t("secondText"),
      rowClass: "flex-row-reverse self-end",
      avatarClass: "bg-gold/25 text-gold",
      bubbleClass: "rounded-tr-sm bg-accent/20",
    },
  ];

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {messages.map(({ key, name, text, rowClass, avatarClass, bubbleClass }) => (
        <div key={key} className={cn("flex max-w-[85%] items-start gap-3", rowClass)}>
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full font-unbounded text-sm font-semibold",
              avatarClass,
            )}
          >
            {name.charAt(0)}
          </span>
          <div className={cn("flex flex-col gap-1 rounded-2xl px-4 py-3", bubbleClass)}>
            <span className="text-sm font-semibold text-foreground">{name}</span>
            <p className="text-sm leading-snug text-zinc-light">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
