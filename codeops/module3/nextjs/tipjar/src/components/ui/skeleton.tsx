import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-neutral-800/60 border border-white/5", className)}
      {...props}
    />
  );
}

export { Skeleton };
