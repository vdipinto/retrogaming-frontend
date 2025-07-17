import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import { notFound } from "next/navigation";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page | null }>(print(PageQuery), {
    id: node.databaseId,
  });

  if (!page || !page.content) {
    notFound(); // triggers Next.js 404 page
  }

  return (
    <main className="prose max-w-3xl mx-auto py-12">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
