import type { Metadata } from "next";
import { getAllPosts, getAllTags, BlogPostMeta } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "博客 | Dosaka_Lin",
  description: "Dosaka_Lin 的技术博客 — 算法竞赛、Agent 开发与技术探索。",
};

export default function BlogListPage() {
  const posts: BlogPostMeta[] = getAllPosts();
  const tags: string[] = getAllTags();

  return <BlogListClient posts={posts} tags={tags} />;
}
