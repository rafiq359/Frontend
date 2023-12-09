import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

function Feature({
  title,
  description,
  showLink,
  newTab,
  url,
  text,
  media,
}: Feature) {
  const imageUrl = getStrapiMedia(media.data?.attributes.url);
  return (
    <div className="flex flex-col justify-center items-center p-3 flex-grow shadow-lg rounded">
      <Image src={imageUrl ?? ""} alt="" width={100} height={100} />

      <h3 className="my-2 text-xl text-center font-semibold">{title}</h3>
      <div className="space-y-1 leading-tight my-3 text-center">
        <p>{description}</p>
      </div>
      {/* {showLink && url && text && (
        <div>
          <Link
            href={url}
            target={newTab ? "_blank" : "_self"}
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-violet-500 rounded-lg hover:bg-violet-600"
          >
            {text}
          </Link>
        </div>
      )} */}
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100 md:py-12 lg:py-16">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.heading}</h2>
        <p className="dark:text-gray-400">{data.description}</p>
      </div>
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
