import { prepareSvgForInline } from "@/shared/lib/prepareSvgForInline";
import { cn } from "@/shared/lib/utils";

interface Props {
  svg: string;
  className?: string;
}

export const InlineSvg = ({ svg, className }: Props) => {
  if (!svg) return null;

  const html = prepareSvgForInline(svg);

  return (
    <span
      className={cn("inline-flex shrink-0 [&_svg]:size-full", className)}
      dangerouslySetInnerHTML={{ __html: html }}
      aria-hidden
    />
  );
};
