export const nextSlugToWpSlug = (nextSlug: string[] | undefined): string => {
  const path = nextSlug?.join("/") ?? "";
  return `/${path.replace(/^\/|\/$/g, "")}/`;
};