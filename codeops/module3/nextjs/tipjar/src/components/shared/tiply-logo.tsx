import * as React from "react";

export function TiplyLogoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 3 heart/clover petals in brand emerald */}
      <circle cx="11" cy="12" r="6" fill="#059669" />
      <circle cx="21" cy="12" r="6" fill="#059669" />
      <circle cx="16" cy="21" r="6" fill="#059669" />
      {/* inner subtle highlight dot */}
      <circle cx="16" cy="15" r="2.5" fill="#34D399" />
    </svg>
  );
}

export function TiplyLogo({
  size = "md",
  showText = true,
}: {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}) {
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2 select-none group">
      <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <TiplyLogoIcon className={iconSizes[size]} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizes[size]} tracking-tight text-foreground`}>
          Tiply
        </span>
      )}
    </div>
  );
}
