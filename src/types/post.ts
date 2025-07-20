export type Category = {
  name: string;
  slug: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  gameYear?: string;

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

  tags?: {
    edges: {
      node: Tag;
    }[];
  };
};

export type PostEdge = {
  node: Post;
};

export type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
};

export type PostConnection = {
  edges: PostEdge[];
  pageInfo: PageInfo;
};
