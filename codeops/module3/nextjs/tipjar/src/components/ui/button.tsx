import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-amber-600 text-primary-foreground font-bold shadow-sm transition-all",
        emerald:
          "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm",
        destructive:
          "bg-destructive hover:opacity-90 text-destructive-foreground font-semibold",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted font-medium",
        secondary:
          "bg-muted text-foreground hover:bg-border/60 font-medium",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium",
        glow:
          "bg-primary hover:bg-amber-600 text-primary-foreground font-bold shadow-sm",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-semibold",
        icon: "h-10 w-10 p-0 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
