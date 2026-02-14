"use client";

interface TitleProps {
  title: string;
  yearOfRelease: number;
}

export const Title = ({ title, yearOfRelease }: TitleProps) => {
  return (
    <div className="flex justify-between mb-2">
      <h3 className="max-w-[200px] overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold text-foreground">
        {title}
      </h3>

      <span>{yearOfRelease}</span>
    </div>
  );
};
