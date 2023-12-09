import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { Metadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;
  const contentSections = page;

  return sectionRenderer(contentSections);
}
