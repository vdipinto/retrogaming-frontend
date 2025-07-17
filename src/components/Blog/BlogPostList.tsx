import type { Post } from "@/types/post";
import BlogCard from "./BlogCard";

type Props = {
  posts: Post[];
};

export default function BlogPostList({ posts }: Props) {
  if (posts.length === 0) {
    return <p className="text-gray-500">No posts found.</p>;
  }

  return (
    <section className="space-y-10">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
