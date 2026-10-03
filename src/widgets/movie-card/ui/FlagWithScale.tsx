"use client";

import { ReactNode } from "react";

interface Props {
  scaleName: string | null;
  showScale: boolean;
  children: ReactNode;
}

export const FlagWithScale = ({ scaleName, showScale, children }: Props) => {
  return showScale ?
      <div className="flex flex-col gap-1">
        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white text-shadow-flag">
          {scaleName}
        </h4>

        {children}
      </div>
    : <>{children}</>;
};
