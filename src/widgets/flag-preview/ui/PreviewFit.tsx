import type { FitScaleMeasurement } from "@/entities/flag-badge";
import type { ReactNode } from "react";

interface Props {
  fit: FitScaleMeasurement;
  children: ReactNode;
}

export const PreviewFit = ({ fit, children }: Props) => {
  const fitted = fit.scale < 1 && fit.width !== undefined && fit.height !== undefined;

  return (
    <div
      className={fitted ? "relative shrink-0" : "w-max shrink-0"}
      style={fitted ? { width: fit.width, height: fit.height } : undefined}
    >
      <div
        ref={fit.contentRef}
        className={fitted ? "absolute top-0 left-0 w-max" : "w-max"}
        style={fit.contentStyle}
      >
        {children}
      </div>
    </div>
  );
};
