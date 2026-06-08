export interface CompetitionAward {
  id: string;
  title: string;
  contest: string;
  date: string;
  rank?: string;
  description?: string;
  level: "gold" | "silver" | "bronze" | "national" | "participation";
}

export const competitionAwards: CompetitionAward[] = [
  {
    id: "ccpc-nanchang-2026",
    title: "CCPC 2026 南昌邀请赛 银奖",
    contest: "CCPC 南昌邀请赛",
    date: "2026",
    rank: "银奖",
    description: "中国大学生程序设计竞赛南昌邀请赛",
    level: "silver",
  },
  {
    id: "ccpc-jiangxi-silver",
    title: "CCPC 江西省赛 银奖",
    contest: "CCPC 江西省赛",
    date: "2026",
    rank: "银奖",
    description: "中国大学生程序设计竞赛江西省赛",
    level: "silver",
  },
  {
    id: "icpc-jiangxi-bronze",
    title: "ICPC 江西省赛 铜奖",
    contest: "ICPC 江西省赛",
    date: "2026",
    rank: "铜奖",
    description: "国际大学生程序设计竞赛江西省赛",
    level: "bronze",
  },
  {
    id: "ruikang-national-3",
    title: "睿抗编程 国赛三等奖",
    contest: "睿抗编程开发者大赛",
    date: "2025",
    rank: "国三",
    description: "睿抗编程开发者大赛全国总决赛",
    level: "national",
  },
];

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
