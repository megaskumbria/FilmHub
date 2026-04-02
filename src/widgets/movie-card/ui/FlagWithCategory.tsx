"use client";

import { ReactNode } from "react";

interface FlagWithCategoryProps {
  category: string | null;
  showCategory: boolean;
  children: ReactNode;
}

export const FlagWithCategory = ({ category, showCategory, children }: FlagWithCategoryProps) => {
  return showCategory ?
      <div className="flex flex-col gap-1">
        <h4 className="text-[10px] font-extrabold text-zinc-muted uppercase tracking-widest drop-shadow-sm">
          {category}
        </h4>

        {children}
      </div>
    : <>{children}</>;
};
