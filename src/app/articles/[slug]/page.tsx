import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostBySlugQuery } from "@/queries/posts/PostBySlugQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { setSeoData } from "@/utils/seoData";
import { print } from "graphql/language/printer";
import type { Metadata } from "next";

// ✅ Next.js 15-compliant: await the `params` Promise directly
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { contentNode } = await fetchGraphQL<{ contentNode: any }>(
    print(SeoQuery),
    {
      slug,
      idType: "URI",
    }
  );

  if (!contentNode?.seo) {
    return {
      title: "Post Not Found",
    };
  }

  return setSeoData({ seo: contentNode.seo, slug });
}

// ✅ Page component using the same `Promise<{ params }>` pattern
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { post } = await fetchGraphQL<{ post: any }>(
    print(PostBySlugQuery),
    {
      slug,
    }
  );

  if (!post) return notFound();

  return (
    <main className="prose max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.featuredImage?.node?.sourceUrl && (
        <img
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          className="mb-4 rounded"
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
