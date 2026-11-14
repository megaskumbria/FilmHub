import { useDeleteFlagScale } from "@/shared/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
} from "@/shared/ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  scaleName: string;
  id: string;
  isEditing: boolean;
  handleStartRename: (currentName: string, scaleId: string) => void;
  onDropdownClose: () => void;
}

export const FlagScaleActions = ({
  id,
  scaleName,
  isEditing,
  handleStartRename,
  onDropdownClose,
}: Props) => {
  const t = useTranslations("flags.scales");
  const { mutate: deleteScale } = useDeleteFlagScale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-editing={isEditing}
          variant="transparent"
          size="none"
          onClick={(event) => event.stopPropagation()}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-transparent text-zinc-muted/70 opacity-100 transition-all hover:border-border/70 hover:bg-white/6 hover:text-foreground data-[editing=true]:bg-white/6 data-[editing=true]:text-foreground data-[editing=true]:opacity-100 data-[state=open]:bg-white/6 data-[state=open]:text-foreground data-[state=open]:opacity-100 [@media(hover:hover)]:lg:opacity-0 [@media(hover:hover)]:lg:group-hover/trigger:opacity-100 [@media(hover:hover)]:lg:data-[editing=true]:opacity-100 [@media(hover:hover)]:lg:data-[state=open]:opacity-100"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          onDropdownClose();
        }}
        align="end"
        className="w-40 bg-surface border-border/60 shadow-popover"
      >
        <DropdownMenuItem
          className="text-foreground/80 hover:text-foreground focus:text-foreground focus:bg-white/6 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleStartRename(scaleName, id);
          }}
        >
          <Pencil className="size-3.5 text-zinc-muted" />
          <span>{t("rename")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border/40" />

        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer focus:bg-destructive/10"
          onClick={(e) => {
            e.stopPropagation();
            deleteScale(id);
          }}
        >
          <Trash2 className="size-3.5" />
          <span>{t("delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
