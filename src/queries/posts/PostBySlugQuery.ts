import gql from "graphql-tag";

export const PostBySlugQuery = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      excerpt
      date
      gameYear
      featuredImage {
        node {
          sourceUrl
          altText
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
`;
