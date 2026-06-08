"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { templates, Template, categories } from "@/data/templates";
import { Code2, Copy, Check } from "lucide-react";

export default function TemplatesPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    activeCat === "all"
      ? templates
      : templates.filter((t) => t.category === activeCat);

  const copyCode = async (template: Template) => {
    await navigator.clipboard.writeText(template.code);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
            算法模板
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            竞赛常用算法模板 & 代码片段。编辑{" "}
            <code className="text-tohsaka-red text-xs bg-white/5 px-1.5 py-0.5 rounded">
              src/data/templates.ts
            </code>{" "}
            添加更多
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-8" />

      {/* Category Filter */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCat === cat.key
                  ? "bg-tohsaka-red text-white"
                  : "text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Template Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p>暂无模板，编辑 src/data/templates.ts 添加</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((template, i) => (
            <ScrollReveal key={template.id} delay={i * 0.08}>
              <GlassCard className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-text-primary flex items-center gap-2">
                      <Code2 size={16} className="text-tohsaka-red" />
                      {template.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">
                      {template.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyCode(template)}
                    className="p-2 rounded-md text-text-muted hover:text-tohsaka-gold hover:bg-white/5 transition-all flex-shrink-0"
                  >
                    {copiedId === template.id ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                <pre className="bg-[#0A0A14] rounded-lg p-4 overflow-x-auto text-sm font-mono text-text-secondary border border-border-subtle max-h-64 overflow-y-auto">
                  <code>{template.code}</code>
                </pre>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge>{template.category}</Badge>
                  <Badge variant="gold">{template.complexity}</Badge>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
