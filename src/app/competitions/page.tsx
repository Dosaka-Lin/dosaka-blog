"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { competitionAwards, platforms } from "@/data/competitions";
import { Trophy, Medal, ExternalLink, TrendingUp } from "lucide-react";
import useCodeforces from "@/hooks/useCodeforces";

const levelConfig: Record<string, { label: string; variant: "gold" | "blue" | "purple" | "red" | "default" }> = {
  gold: { label: "金奖", variant: "gold" },
  silver: { label: "银奖", variant: "blue" },
  bronze: { label: "铜奖", variant: "purple" },
  national: { label: "国奖", variant: "red" },
  participation: { label: "参赛", variant: "default" },
};

// CF 等级颜色映射
const cfRankColors: Record<string, string> = {
  "newbie": "#808080",
  "pupil": "#008000",
  "specialist": "#03A89E",
  "expert": "#0000FF",
  "candidate master": "#AA00AA",
  "master": "#FF8C00",
  "grandmaster": "#FF0000",
};

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
            Codeforces / Luogu 实时数据
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-10" />

      {/* Platform Cards */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {/* Codeforces */}
          <GlassCard hover className="p-6 text-center">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Codeforces</div>
            {cfLoading ? (
              <div className="text-text-muted text-base my-2">加载中...</div>
            ) : cfData ? (
              <>
                <div
                  className="text-3xl font-display font-bold mb-1"
                  style={{ color: cfRankColors[cfData.rank?.toLowerCase()] || cfRankColors.specialist }}
                >
                  {cfData.rating}
                </div>
                <div className="text-sm mb-1" style={{ color: cfRankColors[cfData.rank?.toLowerCase()] || cfRankColors.specialist }}>
                  {cfData.rank}
                </div>
                <div className="text-xs text-text-muted">max: {cfData.maxRating}</div>
              </>
            ) : (
              <div className="text-text-muted text-base my-2">获取失败</div>
            )}
            <div className="text-sm text-text-secondary mt-2 mb-3">{platforms.codeforces.handle}</div>
            <Button href={platforms.codeforces.url} variant="ghost" size="sm" external>
              <ExternalLink size={12} /> 访问主页
            </Button>
          </GlassCard>

          {/* 牛客 */}
          <GlassCard hover className="p-6 text-center">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">牛客</div>
            <div className="text-text-muted text-sm my-2">
              暂无公开 API
            </div>
            <div className="text-sm text-text-secondary mt-2 mb-3">{platforms.nowcoder.handle}</div>
            <Button href={platforms.nowcoder.url} variant="ghost" size="sm" external>
              <ExternalLink size={12} /> 访问主页
            </Button>
          </GlassCard>

          {/* Luogu */}
          <GlassCard hover className="p-6 text-center">
            <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Luogu</div>
            <div className="text-text-muted text-sm my-2">
              暂无公开 API
            </div>
            <div className="text-sm text-text-secondary mt-2 mb-3">{platforms.luogu.handle}</div>
            <Button href={platforms.luogu.url} variant="ghost" size="sm" external>
              <ExternalLink size={12} /> 访问主页
            </Button>
          </GlassCard>
        </div>
      </ScrollReveal>

      <SectionDivider />

      {/* Rating Change */}
      {cfData && cfData.contests.length > 0 && (
        <ScrollReveal delay={0.15}>
          <div className="my-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-tohsaka-gold" />
              <h2 className="text-xl font-display font-bold text-text-primary">CF 近期比赛</h2>
            </div>
            <GlassCard hover={false} className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-muted border-b border-border-subtle">
                    <th className="text-left py-2 px-3">比赛</th>
                    <th className="text-right py-2 px-3">排名</th>
                    <th className="text-right py-2 px-3">Rating变化</th>
                  </tr>
                </thead>
                <tbody>
                  {[...cfData.contests].reverse().map((c, i) => (
                    <tr key={i} className="border-b border-border-subtle/50">
                      <td className="py-2 px-3 text-text-secondary text-xs max-w-[200px] truncate">{c.name}</td>
                      <td className="py-2 px-3 text-right text-text-secondary">#{c.rank}</td>
                      <td className={`py-2 px-3 text-right font-medium ${
                        c.ratingChange.startsWith("+") ? "text-green-400" : "text-red-400"
                      }`}>
                        {c.ratingChange}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
        </ScrollReveal>
      )}

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
                      <Badge variant={levelConfig[award.level]?.variant || "default"} size="sm">
                        {award.rank}
                      </Badge>
                    )}
                    {award.description && (
                      <p className="text-xs text-text-muted mt-1">{award.description}</p>
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
