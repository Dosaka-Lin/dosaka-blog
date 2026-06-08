export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techs: string[];
  category: "algorithm" | "fullstack" | "agent" | "other";
  github?: string;
  demo?: string;
  featured?: boolean;
}

// TODO: 在此添加你的项目
export const projects: Project[] = [
  {
    id: "example-project",
    title: "示例项目",
    description: "这是一个示例项目，你可以删除它并添加自己的项目。",
    techs: ["TypeScript", "Next.js", "Tailwind"],
    category: "fullstack",
    github: "https://github.com/Dosaka",
    featured: true,
  },
];

export const categories = [
  { key: "all", label: "全部" },
  { key: "algorithm", label: "算法" },
  { key: "fullstack", label: "全栈" },
  { key: "agent", label: "Agent" },
  { key: "other", label: "其他" },
] as const;
