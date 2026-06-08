"use client";

import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/ui/Button";
import { ArrowRight, Swords, BookOpen } from "lucide-react";

const roles = [
  "Algorithm Engineer",
  "Agent Developer",
  "Competitive Programmer",
];

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 text-center">
      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-tohsaka-red/10 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-8 rounded-full border border-tohsaka-gold/5 animate-[spin_40s_linear_infinite_reverse]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Subtitle */}
        <p className="text-tohsaka-gold font-display text-sm tracking-[0.3em] uppercase mb-6">
          Dosaka_Lin
        </p>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-primary mb-4 leading-tight">
          Hello, I&apos;m{" "}
          <span className="text-tohsaka-red">Dosaka</span>
        </h1>

        {/* Typewriter */}
        <div className="h-10 mb-8">
          <TypewriterText
            texts={roles}
            className="text-xl md:text-2xl text-text-secondary font-body"
            speed={70}
            deleteSpeed={35}
            pause={2500}
          />
        </div>

        {/* Description */}
        <p className="max-w-xl mx-auto text-text-muted leading-relaxed mb-10">
          算法竞赛选手 / 全栈开发 / 专注于 Agent 与算法工程
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/competitions" variant="primary" size="lg">
            <Swords size={18} />
            竞赛战绩
            <ArrowRight size={16} />
          </Button>
          <Button href="/blog" variant="outline" size="lg">
            <BookOpen size={18} />
            阅读博客
          </Button>
        </div>
      </div>
    </section>
  );
}
