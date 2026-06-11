import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目 | Dosaka_Lin",
  description: "Dosaka_Lin 的项目经历 — 本地项目与 GitHub 开源仓库。",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
