interface BadgeProps {
  children: string;
  variant?: "red" | "gold" | "purple" | "blue" | "default";
  size?: "sm" | "md";
}

export default function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
  const colors = {
    red: "bg-tohsaka-red/15 text-tohsaka-red border-tohsaka-red/30",
    gold: "bg-tohsaka-gold/15 text-tohsaka-gold border-tohsaka-gold/30",
    purple: "bg-tohsaka-purple/15 text-tohsaka-purple border-tohsaka-purple/30",
    blue: "bg-tohsaka-blue/15 text-blue-300 border-tohsaka-blue/40",
    default: "bg-white/5 text-text-secondary border-white/10",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={`inline-block rounded-full border ${colors[variant]} ${sizes[size]} font-medium`}>
      {children}
    </span>
  );
}
