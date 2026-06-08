import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/Icons";
import { Mail, MapPin } from "lucide-react";

const timeline = [
  { year: "2026", title: "职业起点", desc: "面向 Agent 开发工程师 & 算法工程师方向" },
  { year: "2025", title: "持续竞赛", desc: "Codeforces 冲分，ICPC/CCPC 备赛" },
  { year: "2024", title: "入门算法竞赛", desc: "开始参加 Codeforces、牛客、Luogu 等平台比赛" },
];

const interests = [
  "Agent 开发", "算法竞赛", "全栈工程", "开源贡献", "AI/ML", "系统设计"
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Profile Header */}
      <ScrollReveal>
        <div className="text-center mb-6">
          {/* Avatar placeholder */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-tohsaka-red to-tohsaka-gold flex items-center justify-center">
            <span className="text-3xl font-display font-bold text-white">D</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
            Dosaka_Lin
          </h1>
          <p className="text-text-secondary">Algorithm Engineer · Agent Developer</p>
          <div className="flex items-center justify-center gap-1 text-text-muted text-sm mt-1">
            <MapPin size={12} />
            <span>China</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Action Buttons */}
      <ScrollReveal delay={0.1}>
        <div className="flex justify-center gap-3 mb-12">
          <Button href="https://github.com/Dosaka" variant="primary" size="sm" external>
            <GithubIcon size={16} />
            GitHub
          </Button>
          <Button href="mailto:dosaka@example.com" variant="outline" size="sm">
            <Mail size={16} />
            Email
          </Button>
        </div>
      </ScrollReveal>

      <SectionDivider />

      {/* About */}
      <ScrollReveal delay={0.15}>
        <div className="my-10">
          <h2 className="text-xl font-display font-bold text-text-primary mb-4">关于我</h2>
          <GlassCard hover={false} className="p-6">
            <p className="text-text-secondary leading-relaxed">
              算法竞赛选手，全栈开发者。专注于 Agent 开发与算法工程。
              热爱探索前沿技术，追求代码的优雅与效率。
              在算法竞赛中磨练思维，在工程项目中积累经验。
            </p>
          </GlassCard>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <ScrollReveal delay={0.2}>
        <div className="mb-10">
          <h2 className="text-xl font-display font-bold text-text-primary mb-4">经历</h2>
          <div className="relative">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 pb-6 relative">
                {/* Line */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-px bg-tohsaka-red/20" />
                )}
                {/* Dot */}
                <div className="w-[30px] h-[30px] rounded-full bg-tohsaka-red/20 border-2 border-tohsaka-red flex-shrink-0 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-tohsaka-red" />
                </div>
                <div>
                  <span className="text-xs text-tohsaka-gold font-medium">{item.year}</span>
                  <h3 className="text-text-primary font-medium">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Interests */}
      <ScrollReveal delay={0.25}>
        <div className="mb-10">
          <h2 className="text-xl font-display font-bold text-text-primary mb-4">关注方向</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="red" size="md">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <SectionDivider />

      {/* Career Goal */}
      <ScrollReveal delay={0.3}>
        <div className="mt-10 text-center">
          <p className="text-text-muted italic">
            &ldquo;成为一名优秀的 Agent 开发工程师 / 算法工程师&rdquo;
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
