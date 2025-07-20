import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/post";
import { format } from "date-fns";

// Strip all HTML tags from the excerpt
function stripAllHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

type Props = {
  post: Post;
};

export default function BlogCard({ post }: Props) {
  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM d, yyyy")
    : "";

  const category = post.categories?.edges[0]?.node;
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  return (
    <Link
      href={`/articles/${post.slug}`}
      className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-zinc-900"
    >
      {/* Image with category badge */}
      <div className="relative h-56">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 100vw"
          />
        )}

        {/* Category badge (optional) */}
        {category && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            {category.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white leading-snug">
          {post.title}
        </h2>

        {/* Excerpt (plain text only) */}
        <p
  className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3"
  style={{ textDecoration: "none" }}
>
  {stripAllHtml(post.excerpt)}
</p>
        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}
