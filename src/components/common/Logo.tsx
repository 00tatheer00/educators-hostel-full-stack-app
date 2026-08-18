"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  variant?: "dark" | "light" | "auto";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  showText?: boolean;
  showBadge?: boolean;
  badgeText?: string;
  subtext?: string;
  className?: string;
  imageClassName?: string;
  href?: string | null;
  priority?: boolean;
}

const SIZE_MAP: Record<string, { imgSize: number; textTitle: string; textSub: string; badgeSize: string }> = {
  xs: { imgSize: 32, textTitle: "text-xs font-bold", textSub: "text-[9px]", badgeSize: "text-[8px] px-1 py-0.2" },
  sm: { imgSize: 42, textTitle: "text-sm font-bold", textSub: "text-[10px]", badgeSize: "text-[8px] px-1.5 py-0.5" },
  md: { imgSize: 52, textTitle: "text-base font-bold", textSub: "text-[11px]", badgeSize: "text-[9px] px-1.5 py-0.5" },
  lg: { imgSize: 68, textTitle: "text-lg font-bold", textSub: "text-xs", badgeSize: "text-[10px] px-2 py-0.5" },
  xl: { imgSize: 96, textTitle: "text-2xl font-extrabold", textSub: "text-xs", badgeSize: "text-xs px-2.5 py-1" },
};

export function Logo({
  variant = "dark",
  size = "md",
  showText = true,
  showBadge = true,
  badgeText = "Royal Living",
  subtext = "University Road, Peshawar",
  className = "",
  imageClassName = "",
  href = "/",
  priority = false,
}: LogoProps) {
  const isCustomSize = typeof size === "number";
  const sizeConfig = isCustomSize
    ? { imgSize: size, textTitle: "text-base font-bold", textSub: "text-[11px]", badgeSize: "text-[9px] px-1.5 py-0.5" }
    : SIZE_MAP[size] || SIZE_MAP.md;

  const logoSrc = variant === "light" ? "/images/logo-light.png" : "/images/logo-dark.png";

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Pure Floating Emblem Without Any Background Box */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${imageClassName}`}
        style={{ width: sizeConfig.imgSize, height: sizeConfig.imgSize }}
      >
        <Image
          src={logoSrc}
          alt="Educator Girls Hostel Emblem"
          width={sizeConfig.imgSize * 2}
          height={sizeConfig.imgSize * 2}
          priority={priority}
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-serif tracking-tight transition-colors ${sizeConfig.textTitle} ${
                variant === "light"
                  ? "text-slate-900 group-hover:text-amber-700"
                  : "text-white group-hover:text-amber-400"
              }`}
            >
              Educator Girls Hostel
            </span>
            {showBadge && badgeText && (
              <span
                className={`font-extrabold uppercase tracking-wider rounded border ${sizeConfig.badgeSize} ${
                  variant === "light"
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                }`}
              >
                {badgeText}
              </span>
            )}
          </div>
          {subtext && (
            <p
              className={`${sizeConfig.textSub} font-normal flex items-center gap-1.5 ${
                variant === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              <span>{subtext}</span>
              <span className={variant === "light" ? "text-amber-600 font-medium" : "text-amber-400 font-medium"}>
                • 100% Female Safe
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
