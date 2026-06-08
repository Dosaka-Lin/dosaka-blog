# 🎌 Dosaka_Lin 个人博客 — 工作计划

> **设计灵感**: 远坂凛 — 红金黑配色、优雅干练、精致而不张扬
> **设计原则**: 简洁、专业、有品味，二次元元素点到为止

---

## 一、项目概述

### 1.1 目标
- 展示项目经历与技术能力 → 面向 HR / 招聘方
- 展示算法竞赛成绩 → Codeforces / 牛客 / Luogu 实时数据
- 技术博客 → 算法题解、技术分享
- 职业方向 → Agent 开发工程师 / 算法工程师

### 1.2 核心功能
| 功能 | 说明 |
|------|------|
| 🏆 竞赛数据 | 爬取 CF / 牛客 / Luogu 的实时数据展示 |
| 💼 项目展示 | 项目经历卡片 + 技术栈标签 |
| 📝 技术博客 | MDX 博客，支持代码高亮 |
| 🛠️ 技能展示 | 技术栈可视化（雷达图/进度环） |
| 🙋 关于我 | 个人介绍 + 时间线 |

---

## 二、技术选型

| 层面 | 选型 | 理由 |
|------|------|------|
| 框架 | Next.js 14 (App Router) + TypeScript | SSR/SSG/API 一体化 |
| 样式 | Tailwind CSS 4 | 原子化，自定义设计令牌 |
| 动画 | Framer Motion | 页面过渡、微交互 |
| 内容 | MDX | 博客文章 |
| 图表 | Recharts | Rating 曲线、技能雷达 |
| 部署 | Vercel | 免费、自动部署 |
| 字体 | Google Fonts | 见下方字体方案 |

---

## 三、设计系统

### 3.1 配色方案（远坂凛灵感）
```
主色 (凛红)      #C41E3A   按钮、强调色、链接
金色 (点缀)      #D4A843   徽章、高亮装饰
深蓝             #2C3E6B   次要强调
背景 (深色)      #0D0D1A   主背景
卡片背景         #1A1A2E   卡片、表面
文字主色         #E8E8F0   正文
文字次色         #8888AA   次要信息
代码背景         #0A0A14   代码块
```

### 3.2 字体方案
- **标题**: Noto Serif JP（日式衬线，呼应远坂凛的优雅气质）
- **正文**: Noto Sans SC（中文阅读舒适）
- **代码**: JetBrains Mono

### 3.3 视觉元素（克制使用）
- 几何装饰线（灵感来自令咒的简洁线条）
- 卡片微光泽（灵感来自宝石切面）
- 背景粒子（红色 + 金色，少量）
- 悬停发光效果（按钮、卡片边框）

### 3.4 动效（点到为止）
- 首页标题：打字机效果
- 卡片悬停：轻微上浮 + 边框发光
- 滚动进入：元素淡入上移
- 数字统计：计数器动画
- 页面切换：Framer Motion 过渡

---

## 四、页面结构

```
/                       首页 (Hero + 数据概览)
├── /projects           项目经历
├── /competitions       算法竞赛 (CF/牛客/Luogu)
├── /skills             技术栈
├── /blog               博客列表
│   └── /blog/[slug]    博客详情
├── /about              关于我
└── /api/
    ├── /api/codeforces
    ├── /api/nowcoder
    └── /api/luogu
```

### 各页面内容

#### 首页 `/`
- Hero：名字 + 打字机标语 + CTA 按钮
- 三个统计卡片（CF Rating / 项目数 / 竞赛经验）
- 技术栈标签云
- 最新博客预览（2-3篇）

#### 项目经历 `/projects`
- 卡片网格布局
- 每个卡片：项目名、简介、技术栈标签、链接
- 悬停：上浮 + 边框发光
- 分类筛选（全部 / 算法 / 全栈 / Agent）

#### 算法竞赛 `/competitions`
- 三个平台数据卡片（CF / 牛客 / Luogu）
- Rating 变化曲线图
- 竞赛获奖时间线
- 题目统计

#### 技术栈 `/skills`
- 分类展示（语言 / 框架 / 算法 / 工具）
- 雷达图
- 技能进度环

#### 博客 `/blog` & `/blog/[slug]`
- 列表：卡片式布局
- 详情：优雅排版 + 代码高亮 + 目录导航
- 标签分类

#### 关于我 `/about`
- 个人介绍
- 教育/竞赛时间线
- 职业目标
- 联系方式

---

## 五、组件结构

```
Layout
├── NavBar (固定顶部，毛玻璃)
│   ├── Logo
│   ├── NavLinks
│   └── MobileMenu
├── Main (slot)
└── Footer

HomePage
├── HeroSection (打字机标题 + CTA)
├── StatsCards (3个数据卡片)
├── TechStackCloud (技能标签)
└── BlogPreview (最新博客)

ProjectsPage → ProjectCard[]
CompetitionsPage → PlatformCard[] + RatingChart + Timeline
SkillsPage → SkillRadar + SkillCategory[]
BlogPage → BlogCard[]
BlogPostPage → PostHeader + TOC + MDXContent
AboutPage → Profile + Timeline + Contact

UI 基础组件
├── GlassCard
├── Button
├── Badge
├── TypewriterText
├── SectionDivider
└── ScrollReveal
```

---

## 六、API 设计

### `GET /api/codeforces`
```json
{
  "handle": "...",
  "rating": 1800,
  "maxRating": 1950,
  "rank": "Expert",
  "contests": [...],
  "solvedCount": 500
}
```

### `GET /api/nowcoder`
```json
{
  "handle": "...",
  "practiceCount": 300,
  "contestCount": 20,
  "rating": 1800
}
```

### `GET /api/luogu`
```json
{
  "handle": "...",
  "solvedCount": 400,
  "level": "蓝钩"
}
```

---

## 七、项目文件结构

```
个人博客/
├── WORKPLAN.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── public/
│   └── images/
│       ├── avatar.png
│       └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── projects/page.tsx
│   │   ├── competitions/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── about/page.tsx
│   │   └── api/
│   │       ├── codeforces/route.ts
│   │       ├── nowcoder/route.ts
│   │       └── luogu/route.ts
│   ├── components/
│   │   ├── layout/ (NavBar, Footer, MobileMenu)
│   │   ├── home/ (HeroSection, StatsCards, TechStackCloud, BlogPreview)
│   │   ├── projects/ (ProjectCard, FilterBar)
│   │   ├── competitions/ (PlatformCard, RatingChart, Timeline)
│   │   ├── skills/ (SkillRadar, SkillItem)
│   │   ├── blog/ (BlogCard, TOC, CodeBlock)
│   │   └── ui/ (GlassCard, Button, Badge, TypewriterText, SectionDivider, ScrollReveal)
│   ├── data/ (projects.ts, skills.ts, competitions.ts)
│   ├── hooks/ (useCodeforces.ts, useNowcoder.ts, useLuogu.ts)
│   ├── lib/ (scrapers/, utils.ts)
│   └── styles/
└── content/
    └── blog/ (*.mdx)
```

---

## 八、实施步骤

### 阶段一：脚手架 & 设计系统
- [ ] 1.1 初始化 Next.js + TypeScript + Tailwind
- [ ] 1.2 配置字体、CSS 变量（配色、阴影）
- [ ] 1.3 布局组件（NavBar, Footer）+ 基础 UI 组件
- [ ] 1.4 背景粒子效果

### 阶段二：首页
- [ ] 2.1 Hero 区域（打字机效果 + CTA）
- [ ] 2.2 统计卡片（计数器动画）
- [ ] 2.3 技能标签云 + 博客预览
- [ ] 2.4 响应式适配

### 阶段三：核心页面
- [ ] 3.1 项目经历页
- [ ] 3.2 技术栈页
- [ ] 3.3 关于我页
- [ ] 3.4 竞赛页静态部分

### 阶段四：竞赛数据 API
- [ ] 4.1 Codeforces API + 前端展示
- [ ] 4.2 牛客 API + 前端展示
- [ ] 4.3 Luogu API + 前端展示
- [ ] 4.4 Rating 曲线图

### 阶段五：博客系统
- [ ] 5.1 MDX 配置 + 博客列表
- [ ] 5.2 博客详情页（TOC + 代码高亮）
- [ ] 5.3 标签系统
- [ ] 5.4 初始文章

### 阶段六：动效打磨 & 性能优化
- [ ] 6.1 页面过渡 & 滚动动画
- [ ] 6.2 卡片微交互
- [ ] 6.3 性能优化 (Lighthouse)

### 阶段七：部署
- [ ] 7.1 Vercel 部署
- [ ] 7.2 最终测试

---

## 九、确认事项汇总

| # | 事项 | 确认结果 |
|---|------|----------|
| 1 | CF handle | **Dosaka** |
| 2 | 牛客 handle | **Dosaka** |
| 3 | Luogu handle | **Dosaka** |
| 4 | GitHub | **github.com/Dosaka** |
| 5 | 项目列表 | 用户自行添加（占位数据结构已就绪） |
| 6 | 竞赛获奖 | 用户自行添加（占位数据结构已就绪） |
| 7 | 头像 | 用户自行上传 |
| 8 | 技术栈 | 用户自行添加（占位数据结构已就绪） |
| 9 | 博客文章 | 暂无，创建模板示例文章 |
| 10 | 域名 | 与用户名相关：`dosaka.vercel.app` 或自定义 |

> 用户提供灵活编辑空间 —— 项目/竞赛/技能数据通过独立 TS 文件管理，修改即可刷新。

---

> 📌 **开始日期**: 2026-06-08
> 🎯 **预计完成**: 约 7-8 天
> 🎨 **设计**: 远坂凛灵感 — 红金黑、简洁优雅
> 📍 **状态**: 🚀 开始实施
