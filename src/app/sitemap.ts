import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hub-fernando-dev.vercel.app/";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          en: `${siteUrl}en/`,
        },
      },
    },
    {
      url: `${siteUrl}en/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-BR": siteUrl,
          en: `${siteUrl}en/`,
        },
      },
    },
  ];
}
