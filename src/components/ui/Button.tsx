import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg cursor-pointer";

  const variants = {
    primary:
      "bg-tohsaka-red text-white hover:bg-tohsaka-red/80 hover:shadow-[0_0_20px_rgba(196,30,58,0.4)]",
    outline:
      "border border-tohsaka-red/50 text-tohsaka-red hover:bg-tohsaka-red/10 hover:border-tohsaka-red",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5",
  };

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
