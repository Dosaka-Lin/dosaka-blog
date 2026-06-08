"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { skills, skillCategories } from "@/data/skills";
import { Zap, Code2, Brain, Wrench } from "lucide-react";
import { useMemo } from "react";

const categoryIcons: Record<string, React.ReactNode> = {
  language: <Code2 size={18} />,
  framework: <Zap size={18} />,
  algorithm: <Brain size={18} />,
  tool: <Wrench size={18} />,
};

const categoryColors: Record<string, string> = {
  language: "tohsaka-red",
  framework: "tohsaka-gold",
  algorithm: "tohsaka-purple",
  tool: "tohsaka-blue",
};

// Simple radar chart component
function RadarChart() {
  const categories = ["算法", "语言", "框架", "工程化"];
  const values = [88, 82, 72, 75];
  const maxR = 100;
  const cx = 120, cy = 110, r = 70;
  const points = values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / values.length - Math.PI / 2;
    const dist = (v / maxR) * r;
    return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={240} height={220} viewBox="0 0 240 220">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={cx}
            cy={cy}
            r={r * scale}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        {/* Axes */}
        {categories.map((_, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(angle) * r}
              y2={cy + Math.sin(angle) * r}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          );
        })}
        {/* Data polygon */}
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(196, 30, 58, 0.15)"
          stroke="#C41E3A"
          strokeWidth={2}
        />
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#C41E3A" />
        ))}
        {/* Labels */}
        {categories.map((cat, i) => {
          const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
          const lx = cx + Math.cos(angle) * (r + 20);
          const ly = cy + Math.sin(angle) * (r + 20);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#8888AA"
              fontSize={11}
            >
              {cat}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function SkillsPage() {
  const grouped = useMemo(() => {
    const map: Record<string, typeof skills> = {};
    for (const s of skills) {
      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    }
    return map;
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
            技术栈
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            持续学习，持续精进。编辑 <code className="text-tohsaka-red text-xs bg-white/5 px-1.5 py-0.5 rounded">src/data/skills.ts</code> 来更新
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-10" />

      {/* Radar Chart */}
      <ScrollReveal delay={0.1}>
        <GlassCard hover={false} className="p-6 mb-10 max-w-md mx-auto">
          <h2 className="text-center font-display font-semibold text-text-primary mb-2">
            能力雷达
          </h2>
          <RadarChart />
        </GlassCard>
      </ScrollReveal>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillCategories.map((cat, ci) => (
          <ScrollReveal key={cat.key} delay={ci * 0.1}>
            <GlassCard hover={false} className="p-6 h-full">
              <div className={`flex items-center gap-2 mb-4 text-${categoryColors[cat.key]}`}>
                {categoryIcons[cat.key]}
                <h3 className="font-display font-semibold text-text-primary">{cat.label}</h3>
              </div>
              <div className="space-y-3">
                {(grouped[cat.key] || []).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-text-secondary">{skill.name}</span>
                      <span className="text-xs text-text-muted">
                        {skill.years ? `${skill.years}年` : ""}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${categoryColors[cat.key]} transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
                {(grouped[cat.key] || []).length === 0 && (
                  <p className="text-sm text-text-muted">暂无数据，编辑 src/data/skills.ts 添加</p>
                )}
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
