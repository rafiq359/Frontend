import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = `/tools`;
  const urlParamsObject = {
    filter: { slug },
    locale: lang,
    populate: {
      RelatedTools: { populate: "*" },
      feature: { populate: "*" },
      issues: { populate: "*" },
      faqs: { populate: "*" },
    },
  };

  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI(path, urlParamsObject, options);
}
