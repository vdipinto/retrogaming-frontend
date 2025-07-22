import { notFound } from "next/navigation";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { ContentInfoQuery } from "@/queries/general/ContentInfoQuery";
import { SeoQuery } from "@/queries/general/SeoQuery";
import { setSeoData } from "@/utils/seoData";
import { print } from "graphql/language/printer";
import PageTemplate from "@/components/Templates/Page/PageTemplate";
import PostTemplate from "@/components/Templates/Post/PostTemplate";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

// ✅ Don't destructure params directly — use any to bypass the static check
export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await props.params;
  const wpSlug = (slug || []).join("/");

  const { contentNode } = await fetchGraphQL<{ contentNode: any }>(
    print(SeoQuery),
    {
      slug: wpSlug,
      idType: "URI",
    }
  );

  if (!contentNode?.seo) {
    return { title: "404 – Page Not Found" };
  }

  return setSeoData({ seo: contentNode.seo, slug: wpSlug });
}

export default async function Page(props: any) {
  const { slug } = await props.params;
  const wpSlug = (slug || []).join("/");

  const { contentNode } = await fetchGraphQL<{ contentNode: any }>(
    print(ContentInfoQuery),
    {
      slug: wpSlug,
      idType: "URI",
    }
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
