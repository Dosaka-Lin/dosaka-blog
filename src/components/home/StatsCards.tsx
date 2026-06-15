"use client";

import { useEffect, useState, useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Trophy, FolderGit2, Calendar } from "lucide-react";
import useCodeforces from "@/hooks/useCodeforces";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function AnimatedNumber({ target }: { target: string }) {
  // If target isn't a pure number, render it as-is (no animation).
  const num = parseInt(target.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(num);
  const [display, setDisplay] = useState(() => (isNumeric ? "0" : target));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!isNumeric || started.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          started.current = true;
          let current = 0;
          const duration = 1500;
          const step = Math.ceil(num / (duration / 16));
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              setDisplay(target);
              clearInterval(timer);
            } else {
              setDisplay(current + (target.includes("+") ? "+" : ""));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isNumeric, num]);

  return <span ref={ref}>{display}</span>;
}

const defaultStats: Stat[] = [
  { icon: <Trophy size={22} />, label: "Codeforces Rating", value: "1421", sub: "Specialist" },
  { icon: <FolderGit2 size={22} />, label: "GitHub 项目", value: "1+", sub: "开源项目" },
  { icon: <Calendar size={22} />, label: "竞赛经验", value: "2+", sub: "年" },
];

export default function StatsCards() {
  const { data: cfData } = useCodeforces("Dosaka");

  const stats: Stat[] = defaultStats.map((stat, i) => {
    if (i === 0 && cfData) {
      return {
        ...stat,
        value: String(cfData.rating || 0),
        sub: cfData.rank
          ? cfData.rank.charAt(0).toUpperCase() + cfData.rank.slice(1)
          : stat.sub,
      };
    }
    return stat;
  });

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={i} hover={false} className="p-6 text-center">
            <div className="text-tohsaka-red mb-3 flex justify-center">{stat.icon}</div>
            <div className="text-3xl font-display font-bold text-text-primary mb-1">
              <AnimatedNumber target={stat.value} />
            </div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
            {stat.sub && (
              <div className="text-xs text-text-muted mt-0.5">{stat.sub}</div>
            )}
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
