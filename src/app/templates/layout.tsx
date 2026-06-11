import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "算法模板 | Dosaka_Lin",
  description: "算法竞赛常用模板与代码片段 — 图论、数论、数据结构等。",
};

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
