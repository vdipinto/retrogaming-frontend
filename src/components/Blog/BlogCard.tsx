import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/post"; // ✅ Adjusted import path
import { format } from "date-fns";

type Props = {
  post: Post;
};

export default function BlogCard({ post }: Props) {
  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM d, yyyy")
    : "";

  const categoryEdges = post.categories?.edges ?? [];
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  return (
    <article className="mb-10 border-b pb-6">
      {imageUrl && (
        <Link href={`/articles/${post.slug}`}> {/* Adjust route if needed */}
          <Image
            src={imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="mb-4 rounded"
          />
        </Link>
      )}

      {formattedDate && (
        <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
      )}

      <h2 className="text-2xl font-semibold mb-2">
        <Link href={`/articles/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {categoryEdges.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 text-sm">
          {categoryEdges.map(({ node }) => (
            <Link
              key={node.slug}
              href={`/category/${node.slug}`}
              className="text-blue-600 hover:underline"
            >
              #{node.name}
            </Link>
          ))}
        </div>
      )}

      <div
        className="text-gray-600 mb-2"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />

      <Link
        href={`/articles/${post.slug}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Read more →
      </Link>
    </article>
  );
}
