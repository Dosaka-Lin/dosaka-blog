"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { competitionAwards, platforms } from "@/data/competitions";
import { Trophy, Medal, ExternalLink, TrendingUp } from "lucide-react";
import useCodeforces from "@/hooks/useCodeforces";
import Button from "@/components/ui/Button";

const levelConfig = {
  gold: { label: "金奖", variant: "gold" as const },
  silver: { label: "银奖", variant: "blue" as const },
  bronze: { label: "铜奖", variant: "purple" as const },
  participation: { label: "参赛", variant: "default" as const },
};

function PlatformCard({
  name,
  handle,
  color,
  url,
  data,
  loading,
}: {
  name: string;
  handle: string;
  color: string;
  url: string;
  data?: { rating?: number; solved?: number };
  loading: boolean;
}) {
  return (
    <GlassCard hover className="p-6 text-center">
      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">{name}</div>
      <div className="text-2xl font-display font-bold mb-1" style={{ color }}>
        {loading ? (
          <span className="text-text-muted text-base">加载中...</span>
        ) : data?.rating ? (
          data.rating
        ) : (
          <span className="text-text-muted text-base">---</span>
        )}
      </div>
      <div className="text-sm text-text-secondary mb-3">{handle}</div>
      {data?.solved !== undefined && (
        <div className="text-xs text-text-muted">
          已解决 <span className="text-text-primary font-medium">{data.solved}</span> 题
        </div>
      )}
      <Button href={url} variant="ghost" size="sm" external className="mt-2">
        <ExternalLink size={12} />
        访问主页
      </Button>
    </GlassCard>
  );
}

export default function CompetitionsPage() {
  const { data: cfData, loading: cfLoading } = useCodeforces("Dosaka");

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
            算法竞赛
          </h1>
          <p className="text-text-muted max-w-xl mx-auto">
            Codeforces / 牛客 / Luogu 实时数据
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-10" />

      {/* Platform Cards */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <PlatformCard
            name={platforms.codeforces.name}
            handle={platforms.codeforces.handle}
            color={platforms.codeforces.color}
            url={platforms.codeforces.url}
            data={cfData ? { rating: cfData.rating, solved: cfData.solvedCount } : undefined}
            loading={cfLoading}
          />
          <PlatformCard
            name={platforms.nowcoder.name}
            handle={platforms.nowcoder.handle}
            color={platforms.nowcoder.color}
            url={platforms.nowcoder.url}
            loading={false}
          />
          <PlatformCard
            name={platforms.luogu.name}
            handle={platforms.luogu.handle}
            color={platforms.luogu.color}
            url={platforms.luogu.url}
            loading={false}
          />
        </div>
      </ScrollReveal>

      <SectionDivider />

      {/* Rating Chart Placeholder */}
      <ScrollReveal delay={0.15}>
        <div className="my-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-tohsaka-gold" />
            <h2 className="text-xl font-display font-bold text-text-primary">Rating 变化</h2>
          </div>
          <GlassCard hover={false} className="p-6">
            <div className="h-48 flex items-center justify-center text-text-muted text-sm">
              CF 数据加载后将在此展示 Rating 曲线图
            </div>
          </GlassCard>
        </div>
      </ScrollReveal>

      <SectionDivider />

      {/* Competition Awards Timeline */}
      <ScrollReveal delay={0.2}>
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={18} className="text-tohsaka-gold" />
            <h2 className="text-xl font-display font-bold text-text-primary">获奖记录</h2>
          </div>

          {competitionAwards.length === 0 ? (
            <GlassCard hover={false} className="p-8 text-center text-text-muted">
              <p>暂无获奖记录</p>
              <p className="text-sm mt-1">编辑 src/data/competitions.ts 添加你的竞赛获奖</p>
            </GlassCard>
          ) : (
            <div className="relative">
              {competitionAwards.map((award, i) => (
                <div key={award.id} className="flex gap-4 pb-6 relative">
                  {i < competitionAwards.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-tohsaka-gold/20" />
                  )}
                  <div className="w-[30px] h-[30px] rounded-full bg-tohsaka-gold/20 border-2 border-tohsaka-gold flex-shrink-0 flex items-center justify-center mt-1">
                    <Medal size={14} className="text-tohsaka-gold" />
                  </div>
                  <div>
                    <span className="text-xs text-tohsaka-gold font-medium">{award.date}</span>
                    <h3 className="text-text-primary font-medium">{award.title}</h3>
                    <p className="text-sm text-text-secondary">{award.contest}</p>
                    {award.rank && (
                      <Badge variant={levelConfig[award.level].variant} size="sm">
                        {award.rank}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
