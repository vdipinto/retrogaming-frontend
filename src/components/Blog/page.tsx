import { getAllPosts } from "@/queries/posts/getAllPosts";
import BlogPostList from "@/components/Blog/BlogPostList";
import type { PostEdge } from "@/types/post";

export default async function BlogPage() {
  const { posts } = await getAllPosts(10); // cursor pagination-ready

  // ✅ Safely map here, now that posts is defined
  const postList = posts.edges.map((edge: PostEdge) => edge.node);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <BlogPostList posts={postList} />
    </main>
  );
}
