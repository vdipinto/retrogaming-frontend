"use client";

import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import type { Post, PostConnection } from "@/types/post";

const PAGE_SIZE = 10;

export default function PostStream() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [after, setAfter] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
    if (after) params.append("after", after);

    const res = await fetch(`/api/posts?${params.toString()}`);
    const data: { posts: PostConnection } = await res.json();

    const newPosts = data.posts.edges.map((edge) => edge.node);
    setPosts((prev) => [...prev, ...newPosts]);
    setAfter(data.posts.pageInfo.endCursor);
    setHasMore(data.posts.pageInfo.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchPosts();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <>
      <section className="space-y-10">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
      {hasMore && <div ref={loaderRef} className="h-8" />}
    </>
  );
}
