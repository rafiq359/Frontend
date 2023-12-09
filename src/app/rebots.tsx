import { MetadataRoute } from "next";

export default function rebots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https//dxftopdf.com/sitemap.xml",
  };
}
