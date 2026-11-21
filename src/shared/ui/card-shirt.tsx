import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CardShirt = ({ className }: Props) => (
  <div className={cn("relative rounded-xl border border-border bg-background", className)}>
    <div className="aspect-2/3" />

    <div
      aria-hidden
      className="absolute inset-0 rounded-[inherit] bg-cover bg-center"
      style={{ backgroundImage: "url(/images/card-shirt.webp)" }}
    />
  </div>
);
