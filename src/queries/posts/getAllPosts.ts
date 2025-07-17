export async function getAllPosts(limit = 10, after?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!baseUrl) {
    throw new Error("❌ Missing NEXT_PUBLIC_WORDPRESS_API_URL in .env.local");
  }

  const apiUrl = `${baseUrl}/graphql`;

  const query = `
    query GetAllPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            slug
            title
            excerpt
            date
            gameYear
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        first: limit,
        after,
      },
    }),
    next: { revalidate: 10 }, // ISR: revalidate every 10s
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return {
    posts: json.data.posts,
  };
}
