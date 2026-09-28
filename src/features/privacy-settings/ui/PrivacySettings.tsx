"use client";

import { Switch, Separator } from "@/shared/ui";

export const PrivacySettings = () => {
  return (
    <div className="flex flex-col gap-0 rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-zinc-muted">Private profile</p>
            <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-sm font-medium text-zinc-muted">
              Soon
            </span>
          </div>

          <p className="text-sm text-zinc-muted mt-0.5">
            Followers require approval; collections stay hidden from strangers
          </p>
        </div>

        <Switch checked={false} disabled className="shrink-0" />
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-4 px-4 py-3.5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-zinc-muted">Public statistics</p>
            <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-sm font-medium text-zinc-muted">
              Soon
            </span>
          </div>

          <p className="text-sm text-zinc-muted mt-0.5">Other users can see your viewing stats</p>
        </div>

        <Switch checked={false} disabled className="shrink-0" />
      </div>
    </div>
  );
};
