import { Page } from "@/gql/graphql";

export type SetSeoDataProps = {
  seo: Page["seo"];
  slug?: string;
};
