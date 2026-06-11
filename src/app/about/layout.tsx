import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | Dosaka_Lin",
  description: "Dosaka_Lin — 算法工程师 & Agent 开发者。专注算法竞赛与前沿技术探索。",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
