import { getAllPosts, getAllTags, BlogPostMeta } from "@/lib/blog";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-static";

export default function BlogListPage() {
  const posts: BlogPostMeta[] = getAllPosts();
  const tags: string[] = getAllTags();

  return <BlogListClient posts={posts} tags={tags} />;
}
