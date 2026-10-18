import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
}

export const CardShirt = ({ className }: Props) => (
  <div className={cn("relative rounded-xl border border-border bg-background", className)}>
    <div className="aspect-2/3" />

    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
      <Image
        src="/images/card-shirt.png"
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 20vw, 290px"
        className="object-cover"
      />
    </div>
  </div>
);
