import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 font-semibold shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30",
        emerald:
          "bg-gradient-to-r from-emerald-500 to-teal-600 text-neutral-950 font-semibold shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 hover:shadow-emerald-500/30",
        destructive:
          "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 hover:border-rose-500/50",
        outline:
          "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm",
        secondary:
          "bg-neutral-800/80 text-neutral-200 hover:bg-neutral-700/80 border border-neutral-700/50",
        ghost:
          "text-neutral-400 hover:text-white hover:bg-white/5",
        link:
          "text-amber-400 underline-offset-4 hover:underline p-0 h-auto",
        glow:
          "bg-amber-500 text-neutral-950 font-semibold shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:bg-amber-400 hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-13 rounded-xl px-7 text-base font-semibold",
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
