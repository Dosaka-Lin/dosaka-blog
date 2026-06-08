export interface CompetitionAward {
  id: string;
  title: string;
  contest: string;
  date: string;
  rank?: string;
  description?: string;
  level: "gold" | "silver" | "bronze" | "participation";
}

// TODO: 在此添加你的竞赛获奖
export const competitionAwards: CompetitionAward[] = [
  {
    id: "example-1",
    title: "示例奖项",
    contest: "算法竞赛名称",
    date: "2025-01",
    rank: "金奖",
    description: "这是一个示例奖项，你可以删除它并添加自己的获奖记录。",
    level: "gold",
  },
];

// 平台配置
export const platforms = {
  codeforces: {
    name: "Codeforces",
    handle: "Dosaka",
    color: "#2C3E6B",
    url: "https://codeforces.com/profile/Dosaka",
  },
  nowcoder: {
    name: "牛客",
    handle: "Dosaka",
    color: "#C41E3A",
    url: "https://www.nowcoder.com/profile/Dosaka",
  },
  luogu: {
    name: "Luogu",
    handle: "Dosaka",
    color: "#7B4FBF",
    url: "https://www.luogu.com.cn/user/Dosaka",
  },
} as const;
