"use client";

import { ReactNode } from "react";

interface Props {
  scaleName: string | null;
  showScale: boolean;
  children: ReactNode;
}

export const FlagWithScale = ({ scaleName, showScale, children }: Props) => {
  if (!showScale || !scaleName) return children;

  return (
    <div className="flex w-max max-w-full min-w-0 flex-col gap-1">
      <h4 className="max-w-full truncate text-[10px] font-extrabold tracking-widest text-white uppercase text-shadow-flag">
        {scaleName}
      </h4>

      {children}
    </div>
  );
};
