import { getPostContent, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = await getPostContent(slug);

  if (!meta) notFound();

  // Compile MDX
  let mdxContent;
  try {
    const result = await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
      components: {
        pre: ({ children }: { children: React.ReactNode }) => (
          <pre className="bg-[#0A0A14] rounded-lg p-4 overflow-x-auto border border-border-subtle my-4 text-sm font-mono">
            {children}
          </pre>
        ),
        code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-tohsaka-red/10 text-tohsaka-red px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className={`font-mono text-sm ${className || ""}`} {...props}>
              {children}
            </code>
          );
        },
      },
    });
    mdxContent = result.content;
  } catch {
    mdxContent = <p className="text-text-muted">文章渲染失败</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <ScrollReveal>
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-text-muted hover:text-tohsaka-red transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={14} />
          返回博客列表
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
            <time>{meta.date}</time>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {meta.readingTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            {meta.title}
          </h1>
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        <SectionDivider className="mb-8" />
      </ScrollReveal>

      {/* Content */}
      <article className="prose-custom">
        {mdxContent}
      </article>

      <SectionDivider className="mt-12 mb-8" />

      {/* Footer */}
      <div className="text-center">
        <Button href="/blog" variant="outline" size="sm">
          <ArrowLeft size={14} />
          返回博客列表
        </Button>
      </div>
    </div>
  );
}
