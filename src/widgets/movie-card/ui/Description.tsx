"use client";

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  return (
    <p className="text-sm relative line-clamp-3 overflow-hidden max-h-[60px]">{description}</p>
  );
};
