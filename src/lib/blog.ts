import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(contentDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");

      const { data, content } = matter(raw);

      const wordCount = content.trim().length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 500)) + " min";

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: (data.tags || []) as string[],
        readingTime,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()
    ) as BlogPostMeta[];
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export async function getPostContent(slug: string): Promise<{
  meta: BlogPostMeta | null;
  content: string;
}> {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return { meta: null, content: "" };

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const allPosts = getAllPosts();
  const meta = allPosts.find((p) => p.slug === slug) || null;

  return { meta, content };
}
