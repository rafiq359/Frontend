import React from "react";

import GetAllTools from "../../components/GetAllTools";
import { fetchAPI } from "../../utils/fetch-api";
import { Metadata } from "next";
// export default async function page({
//   params,
// }: {
//   params: {
//     [x: string]: string;
//     lang: string;
//   };
// }) {
//   // console.log("params tool slug", params);
//   // try {
//   //   const page = await getPageBySlug("tools", params.lang);
//   //   console.log("page from", page);
//   //   if (page.error && page.error.status == 401)
//   //     throw new Error(
//   //       "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
//   //     );
//   //   if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;
//   //   if (page.data.length === 0) return null;
//   //   const contentSections = page;
//   //   return page.map((tool: any) => ({
//   //     slug: tool.slug,
//   //   }));
//   // } catch (error: any) {
//   //   console.log("Missing or invalid credentials");
//   // }
// }
async function getToolBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/tools`;
  const urlParamsObject = {
    filters: { slug },
    populate: { RelatedTools: { populate: "*" } },
    locale: lang,
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/tools`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const { slug, lang } = params;
  const data = await getToolBySlug(slug, lang);

  if (data.data.length === 0) return <h2>no such tools found</h2>;
  return <GetAllTools data={data.data[0]} params={params} />;
}

// export async function generateStaticParams() {
//   const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
//   const path = `/tools`;

//   const options = { headers: { Authorization: `Bearer ${token}` } };
//   const articleResponse = await fetchAPI(
//     path,
//     {
//       RelatedTools: { populate: "*" },
//     },
//     options
//   );

//   return articleResponse.data.map(
//     (article: {
//       attributes: {
//         slug: string;
//       };
//     }) => ({
//       slug: article.attributes.slug,
//     })
//   );
// }
