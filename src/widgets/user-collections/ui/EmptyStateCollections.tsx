import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { CreateCollectionModal } from "@/widgets";
import { EMPTY_STATE_COLLECTION_PREVIEWS } from "../model/empty-state-collections-data";
import { EmptyStateVisitorCollections } from "./EmptyStateVisitorCollections";

interface Props {
  isMyProfile: boolean;
  userId: string;
}

export const EmptyStateCollections = ({ isMyProfile, userId }: Props) => {
  if (!isMyProfile) return <EmptyStateVisitorCollections userId={userId} />;

  return (
    <div className="pt-20 pb-2">
      <div className="flex items-end justify-center gap-3 px-10 pb-0 select-none">
        {EMPTY_STATE_COLLECTION_PREVIEWS.map((item, i) =>
          item === null ?
            <CreateCollectionModal key={i} isEditing={false}>
              <Button
                variant="transparent"
                size="none"
                className="group relative pt-3 max-w-52 w-full shrink-0 transition-all duration-200"
              >
                <div className="absolute top-0 left-4 h-3 w-16 rounded-t-md border-t border-l border-r border-dashed border-border bg-surface group-hover:border-foreground/30 transition-colors duration-200" />

                <div className="rounded-b-xl rounded-tr-xl border border-dashed border-border overflow-hidden w-full group-hover:border-foreground/30 transition-colors duration-200">
                  <div className="relative h-34 bg-surface-elevated flex items-center justify-center">
                    <span className="flex items-center justify-center size-9 rounded-full border border-border text-foreground/70 group-hover:text-foreground group-hover:border-foreground/40 group-hover:bg-surface-subtle transition-all duration-200">
                      <Plus className="size-4" />
                    </span>
                  </div>

                  <div className="px-3 py-2.5 bg-surface-subtle flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                      Create collection
                    </span>
                  </div>
                </div>
              </Button>
            </CreateCollectionModal>
          : <div
              key={i}
              className={cn(
                "relative pt-3 max-w-52 w-full shrink-0 transition-none pointer-events-none",
                item.rotate,
                item.opacity,
                item.translateY,
              )}
            >
              <div
                className="absolute top-0 left-4 h-3 w-16 rounded-t-md border-t border-l border-r bg-surface"
                style={{ borderColor: `${item.color}80` }}
              />

              <div
                className="rounded-b-xl rounded-tr-xl border overflow-hidden"
                style={{ borderColor: `${item.color}60` }}
              >
                <div
                  className="relative h-34"
                  style={{
                    background: `linear-gradient(to top, color-mix(in srgb, ${item.color} 25%, #0f0f11) 0%, color-mix(in srgb, ${item.color} 10%, #0f0f11) 100%)`,
                  }}
                >
                  <div className="absolute top-2 left-2 size-6 rounded-md bg-black/50 flex items-center justify-center ring-1 ring-white/10">
                    <item.icon className="size-3.5" style={{ color: item.color }} stroke={1.5} />
                  </div>
                </div>

                <div className="px-3 py-2.5 bg-surface-subtle flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                  <span className="text-xs text-muted shrink-0">{item.count}</span>
                </div>
              </div>
            </div>,
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface via-surface/70 to-transparent" />
    </div>
  );
};
