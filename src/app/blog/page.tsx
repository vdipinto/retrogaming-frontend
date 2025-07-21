import PostStreamWrapper from "@/components/Blog/PostStreamWrapper";

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      <PostStreamWrapper />
    </main>
  );
}
