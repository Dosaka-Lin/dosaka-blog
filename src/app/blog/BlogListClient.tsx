"use client";

import { useState, useMemo } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { BlogPostMeta } from "@/lib/blog";
import Link from "next/link";
import { Clock } from "lucide-react";

interface Props {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogListClient({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <ScrollReveal>
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
            博客
          </h1>
          <p className="text-text-muted">
            文章放在{" "}
            <code className="text-tohsaka-red text-xs bg-white/5 px-1.5 py-0.5 rounded">
              content/blog/*.mdx
            </code>
          </p>
        </div>
      </ScrollReveal>

      <SectionDivider className="mb-8" />

      {/* Tag filter */}
      {tags.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                !activeTag
                  ? "bg-tohsaka-red text-white"
                  : "text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10"
              }`}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  activeTag === tag
                    ? "bg-tohsaka-red text-white"
                    : "text-text-secondary hover:text-text-primary bg-white/5 hover:bg-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Blog list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg mb-2">暂无文章</p>
          <p className="text-sm">在 content/blog/ 目录下创建 .mdx 文件来添加文章</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`}>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                    <time>{post.date}</time>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-semibold text-text-primary mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
