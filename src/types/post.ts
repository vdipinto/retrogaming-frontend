export type Category = {
    name: string;
    slug: string;
  };
  

export type Post = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    featuredImage?: {
      node?: {
        sourceUrl: string;
      };
    };
    categories?: {
        edges: {
          node: Category;
        }[];
      };
  };
  
// I need these to fully and safely handle cursor-based pagination in my GraphQL post list.

// PostEdge is a single post in the list.
export type PostEdge = {
    node: Post;
  };
  

  // PageInfo contains pagination metadata.
  export type PageInfo = {
    endCursor: string | null;
    hasNextPage: boolean;
  };
  
  // PostConnection is the complete list of posts.
  export type PostConnection = {
    edges: PostEdge[];
    pageInfo: PageInfo;
  };