"use client";

import { useEffect, useState, useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { Trophy, FolderGit2, Calendar } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function AnimatedNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num)) {
      setDisplay(target);
      return;
    }

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
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

const defaultStats: Stat[] = [
  { icon: <Trophy size={22} />, label: "Codeforces Rating", value: "1800+", sub: "Expert" },
  { icon: <FolderGit2 size={22} />, label: "GitHub 项目", value: "10+", sub: "开源项目" },
  { icon: <Calendar size={22} />, label: "竞赛经验", value: "3+", sub: "年" },
];

export default function StatsCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {defaultStats.map((stat, i) => (
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
