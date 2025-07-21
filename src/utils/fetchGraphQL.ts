export async function fetchGraphQL<TData = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<TData> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: { revalidate: 10 },
    });

    const json = await res.json();

    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }

    return json.data;
  } catch (error) {
    console.error("❌ GraphQL request failed:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
