import type { Metadata } from "next";
import { print } from "graphql/language/printer";

import { setSeoData } from "@/utils/seoData";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentNode, Page } from "@/gql/graphql";
import { PageQuery } from "@/components/Templates/Page/PageQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";

const notFoundPageWordPressId = 501;

export async function generateMetadata(): Promise<Metadata> {
  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode | null }>(
    print(SeoQuery),
    { slug: notFoundPageWordPressId, idType: "DATABASE_ID" },
  );

  const metadata = contentNode?.seo ? setSeoData({ seo: contentNode.seo }) : {};

  return {
    ...metadata,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  } as Metadata;
}

export default async function NotFound() {
  const { page } = await fetchGraphQL<{ page: Page | null }>(print(PageQuery), {
    id: notFoundPageWordPressId,
  });

  if (!page || !page.content) {
    return (
      <main className="prose max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
        <p>The page could not be loaded from WordPress.</p>
      </main>
    );
  }

  return (
    <main className="prose max-w-3xl mx-auto py-20">
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
