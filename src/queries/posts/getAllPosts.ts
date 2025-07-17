export async function getAllPosts(limit = 10, after?: string) {
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
          }
        }
      }
    }
  `;  
  
    const res = await fetch(process.env.WORDPRESS_API_URL!, {
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
      next: { revalidate: 10 }, // optional ISR
    });
  
    const json = await res.json();
  
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
  
    return {
      posts: json.data.posts,
    };
  }
  