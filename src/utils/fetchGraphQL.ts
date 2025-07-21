export async function fetchGraphQL<TData = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<TData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 10 },
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}
