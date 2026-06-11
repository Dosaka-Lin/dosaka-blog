import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "算法竞赛 | Dosaka_Lin",
  description: "Dosaka_Lin 的算法竞赛成绩 — Codeforces、Luogu 实时数据与获奖记录。",
};

export default function CompetitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
