import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import Loader from "./components/Loader";
import rebots from "../rebots";
import index from "./about/page";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "metadata.title",
      "metadata.description",
      "metadata.keywords",
      "metadata.isIndexing",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    // metadataBase:new URL('www.xyz.com'),
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
    keywords: metadata.keywords,
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
        it: "/it",
        es: "es",
        pt: "/pt",
        ja: "/ja",
        ko: "/ko",
        ar: "/ar",
        "ms-MY": "/ms-MY",
      },
    },
    openGraph: {
      type: "website",
      url: "https://example.com",
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      siteName: "My Website",
      images: [
        {
          url: url,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return <Loader />;

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url
  );

  return (
    <html lang={params.lang}>
      <body className="">
        <Navbar
          lang={params.lang}
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="min-h-screen max-w-1440 page-shadow bg-[efefef]">
          {children}
        </main>

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
