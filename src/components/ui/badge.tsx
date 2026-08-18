import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-amber-400/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25",
        secondary:
          "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800",
        destructive:
          "border-rose-900/50 bg-rose-950/60 text-rose-300 hover:bg-rose-900/60",
        outline: "border-amber-500/40 text-amber-300 bg-black/40",
        emerald:
          "border-amber-500/30 bg-amber-500/15 text-amber-300",
        gold:
          "border-amber-300/60 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-sm",
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
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
