import PageHeader from "@/app/[lang]/components/PageHeader";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import BlogList from "@/app/[lang]/views/blog-list";
import { Metadata } from "next";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
type Props = {
  params: {
    lang: string;
    slug: string;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log("params from blog", params);
  const page = await getPageBySlug(params.slug, params.lang);
  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: filter,
        },
      },
      populate: {
        cover: { fields: ["url"] },
        category: {
          populate: "*",
        },
        authorsBio: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Not Posts In this category</div>;

  const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <div>
      <PageHeader heading={name} text={description} />
      <BlogList data={data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
