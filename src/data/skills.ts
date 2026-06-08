export interface Skill {
  name: string;
  level: number; // 1-100
  category: "language" | "framework" | "algorithm" | "tool";
  years?: number;
  icon?: string;
}

export const skillCategories = [
  { key: "language", label: "语言" },
  { key: "framework", label: "框架 & 库" },
  { key: "algorithm", label: "算法方向" },
  { key: "tool", label: "工具 & 平台" },
] as const;

// TODO: 在此添加你的技术栈
export const skills: Skill[] = [
  { name: "C++", level: 90, category: "language", years: 3 },
  { name: "Python", level: 85, category: "language", years: 3 },
  { name: "TypeScript", level: 75, category: "language", years: 2 },
  { name: "React / Next.js", level: 70, category: "framework", years: 2 },
  { name: "Tailwind CSS", level: 75, category: "framework", years: 1 },
  { name: "动态规划", level: 90, category: "algorithm", years: 3 },
  { name: "图论", level: 85, category: "algorithm", years: 3 },
  { name: "数论", level: 75, category: "algorithm", years: 2 },
  { name: "Git / GitHub", level: 80, category: "tool", years: 3 },
  { name: "Linux", level: 70, category: "tool", years: 2 },
  { name: "Docker", level: 60, category: "tool", years: 1 },
];
