import { useId, type SVGProps } from "react";

export const TelegramIcon = (props: SVGProps<SVGSVGElement>) => {
  const gradientId = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <circle cx={16} cy={16} r={14} fill={`url(#${gradientId})`} />
      <path
        fill="#fff"
        d="M22.987 10.209c.124-.806-.642-1.441-1.358-1.127L7.365 15.345c-.514.225-.476 1.003.056 1.173l2.942.937c.562.179 1.17.086 1.66-.253l6.632-4.582c.2-.138.418.147.247.323l-4.774 4.922c-.463.477-.371 1.286.186 1.636l5.345 3.351c.6.376 1.37-.001 1.483-.726l1.845-11.917Z"
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1={16}
          x2={16}
          y1={2}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#37BBFE" />
          <stop offset={1} stopColor="#007DBB" />
        </linearGradient>
      </defs>
    </svg>
  );
};
