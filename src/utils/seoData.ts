import type { SetSeoDataProps } from "@/types/seoData.types";

export const setSeoData = ({ seo, slug }: SetSeoDataProps) => {
  if (!seo) return {};

  return {
    metadataBase: new URL("https://retrogamingdude.co.uk"),
    title: seo.title || "",
    description: seo.metaDesc || "",
    robots: {
      index: seo.metaRobotsNoindex === "index",
      follow: seo.metaRobotsNofollow === "follow",
    },
    alternates: {
      canonical: seo.canonical || `https://retrogamingdude.co.uk/articles/${slug ?? ""}`,
    },
    openGraph: {
      title: seo.opengraphTitle || "",
      description: seo.opengraphDescription || "",
      url: seo.opengraphUrl || "",
      siteName: seo.opengraphSiteName || "",
      images: [
        {
          url: seo.opengraphImage?.sourceUrl || "",
          width: seo.opengraphImage?.mediaDetails?.width || 1200,
          height: seo.opengraphImage?.mediaDetails?.height || 630,
          alt: seo.opengraphImage?.altText || "",
        },
      ],
      locale: "da_DK",
      type: seo.opengraphType || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || "",
      description: seo.twitterDescription || "",
      images: [seo.twitterImage?.sourceUrl || ""],
    },
  };
};
