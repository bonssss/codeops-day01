import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none select-none",
  {
    variants: {
      variant: {
        default:
          "bg-amber-100 text-amber-900 border border-amber-300/60 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60 font-semibold",
        secondary:
          "bg-muted text-foreground border border-border font-medium",
        destructive:
          "bg-red-100 text-red-900 border border-red-300 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800",
        outline:
          "border border-border bg-card text-foreground font-medium",
        success:
          "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
        warning:
          "bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
        info:
          "bg-amber-100 text-amber-900 border border-amber-300/60 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60",
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
