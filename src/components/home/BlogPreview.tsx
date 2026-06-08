import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const previewPosts = [
  {
    title: "Hello World — 博客开篇",
    date: "2026-06-08",
    excerpt: "欢迎来到我的博客。这里将记录我在算法竞赛、Agent开发和技术探索中的思考与收获。",
    slug: "hello-world",
  },
  {
    title: "算法竞赛入门指南",
    date: "2026-06-08",
    excerpt: "从 Codeforces 到 ICPC，分享算法竞赛的入门路径和核心技巧。",
    slug: "algorithm-guide",
  },
];

export default function BlogPreview() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <ScrollReveal>
        <SectionDivider />
        <div className="text-center mb-8">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-2">最新文章</h2>
          <p className="text-text-muted text-sm">技术思考与竞赛心得</p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {previewPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.1}>
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="glass gem-shine rounded-xl p-6 h-full transition-shadow hover:shadow-[0_0_30px_rgba(196,30,58,0.1)]">
                <time className="text-xs text-text-muted">{post.date}</time>
                <h3 className="text-lg font-display font-semibold text-text-primary mt-1 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="text-center">
          <Button href="/blog" variant="outline">
            查看全部文章 <ArrowRight size={16} />
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
