import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { print } from "graphql/language/printer";

import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { SeoQuery } from "@/queries/general/SeoQuery";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const redirect = searchParams.get("redirect");

  if (!id || !redirect) {
    return new NextResponse("Missing `id` or `redirect` parameter", { status: 400 });
  }

  // Just enter preview mode
  (await draftMode()).enable();

  // Optionally refetch the content (can be removed if not needed)
  await fetchGraphQL(print(SeoQuery), { slug: id, idType: "DATABASE_ID" });

  return NextResponse.redirect(redirect);
}
