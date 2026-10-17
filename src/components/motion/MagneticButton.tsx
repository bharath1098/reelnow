"use client";

import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type MagneticButtonProps = {
  variant?: "primary" | "ghost" | "link" | "bronze";
  strength?: number;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => void;
};

export function MagneticButton({
  className,
  variant = "primary",
  strength = 0.4,
  children,
  href,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const { ref, handlers } = useMagnetic<HTMLButtonElement | HTMLAnchorElement>({
    strength,
  });

  const resolved = variant === "bronze" ? "primary" : variant;

  const styles = cn(
    "relative inline-flex items-center justify-center gap-2 font-sans transition-all duration-300 will-change-transform",
    "text-[12px] font-semibold uppercase tracking-[0.16em]",
    resolved === "primary" &&
      "rounded-full bg-platinum px-8 py-3.5 text-noir hover:bg-silver",
    resolved === "ghost" &&
      "rounded-full border border-platinum/50 bg-transparent px-8 py-3.5 text-platinum backdrop-blur-md hover:border-platinum hover:bg-platinum/10",
    resolved === "link" &&
      "px-0 py-0 text-silver tracking-[0.18em] hover:text-platinum",
    className,
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={styles}
        style={{ transition: "transform 0.2s ease-out" }}
        onClick={onClick}
        {...handlers}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={styles}
      style={{ transition: "transform 0.2s ease-out" }}
      onClick={onClick}
      {...handlers}
    >
      {children}
    </button>
  );
}
