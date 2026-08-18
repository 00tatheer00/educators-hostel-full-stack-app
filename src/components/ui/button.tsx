import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20 font-black",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-amber-500/30 bg-slate-950/40 text-slate-100 hover:bg-amber-500/10 hover:border-amber-400/60 hover:text-amber-300 backdrop-blur-md",
        secondary:
          "bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white shadow-sm",
        ghost:
          "hover:bg-amber-500/10 hover:text-amber-300 text-slate-300",
        link:
          "text-amber-400 underline-offset-4 hover:underline",
        gold:
          "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 hover:from-yellow-400 hover:to-amber-500 shadow-lg shadow-amber-500/25 font-black",
        emerald:
          "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-500/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
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
