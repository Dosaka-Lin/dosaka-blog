import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "技术栈 | Dosaka_Lin",
  description: "Dosaka_Lin 的技术栈 — 编程语言、框架、算法与工程化工具。",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
