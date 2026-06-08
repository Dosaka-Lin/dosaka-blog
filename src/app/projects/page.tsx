"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { projects, categories } from "@/data/projects";
import { GithubIcon } from "@/components/ui/Icons";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
            项目经历
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            我参与和开发的项目。更多项目请访问我的{" "}
            <Link
              href="https://github.com/Dosaka"
              target="_blank"
              className="text-tohsaka-red hover:underline"
            >
              GitHub
            </Link>
          </p>
        </div>
      </ScrollReveal>

      {/* Category Filter */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-tohsaka-red text-white"
                  : "text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-10" />

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg mb-2">暂无项目</p>
          <p className="text-sm">你可以编辑 src/data/projects.ts 添加自己的项目</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <GlassCard className="p-6 h-full flex flex-col">
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techs.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  {project.github && (
                    <Button
                      href={project.github}
                      variant="ghost"
                      size="sm"
                      external
                    >
                      <GithubIcon size={14} />
                      GitHub
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      href={project.demo}
                      variant="ghost"
                      size="sm"
                      external
                    >
                      <ExternalLink size={14} />
                      Demo
                    </Button>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
