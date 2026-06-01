import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ankityadav18.info",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
