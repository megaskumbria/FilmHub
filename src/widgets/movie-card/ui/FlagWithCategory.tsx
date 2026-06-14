"use client";

import { ReactNode } from "react";

interface Props {
  categoryName: string | null;
  showCategory: boolean;
  children: ReactNode;
}

export const FlagWithCategory = ({ categoryName, showCategory, children }: Props) => {
  return showCategory ?
      <div className="flex flex-col gap-1">
        <h4 className="text-[10px] font-extrabold text-zinc-muted uppercase tracking-widest drop-shadow-sm">
          {categoryName}
        </h4>

        {children}
      </div>
    : <>{children}</>;
};
