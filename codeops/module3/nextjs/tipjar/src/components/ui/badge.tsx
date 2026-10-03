import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-amber-500/15 text-amber-300 border-amber-500/30",
        secondary:
          "border-transparent bg-neutral-800 text-neutral-300",
        destructive:
          "border-transparent bg-rose-500/15 text-rose-300 border-rose-500/30",
        outline:
          "text-neutral-300 border-neutral-700",
        success:
          "border-transparent bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        warning:
          "border-transparent bg-amber-500/15 text-amber-300 border-amber-500/30",
        info:
          "border-transparent bg-sky-500/15 text-sky-300 border-sky-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
