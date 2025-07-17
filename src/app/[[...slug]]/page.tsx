export const dynamic = "force-dynamic";
export const dynamicParams = true;
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { nextSlugToWpSlug } from "@/utils/nextSlugToWpSlug";

import { ContentNode } from "@/gql/graphql";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";

import PageTemplate from "@/components/Templates/Page/PageTemplate";
import PostTemplate from "@/components/Templates/Post/PostTemplate";

export async function generateMetadata(props: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const slug = nextSlugToWpSlug(props.params.slug);
  const isPreview = slug.includes("preview");

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode | null }>(
    print(SeoQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) {
    return {
      title: "404 – Page Not Found",
    };
  }

  const metadata = setSeoData({ seo: contentNode.seo });

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${slug}`,
    },
  };
}

export function generateStaticParams() {
  return [];
}

export default async function Page(props: {
  params: { slug?: string[] };
}) {
  const slug = nextSlugToWpSlug(props.params.slug);
  const isPreview = slug.includes("preview");

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode | null }>(
    print(ContentInfoQuery),
    {
      slug: isPreview ? slug.split("preview/")[1] : slug,
      idType: isPreview ? "DATABASE_ID" : "URI",
    },
  );

  if (!contentNode) return notFound();

  switch (contentNode.contentTypeName) {
    case "page":
      return <PageTemplate node={contentNode} />;
    case "post":
      return <PostTemplate node={contentNode} />;
    default:
      return (
        <main className="prose max-w-3xl mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Unsupported content type</h1>
          <p>{contentNode.contentTypeName} is not implemented yet.</p>
        </main>
      );
  }
}
