"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Loader from "../components/Loader";
import Blog from "../views/blog-list";
import PageHeader from "../components/PageHeader";
import RightSideAds from "../components/RightSideAds";
import LeftSideAds from "../components/LeftSideAds";
import UpperAds from "../components/UpperAds";
interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  console.log("articles data", data);
  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: {
            populate: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex gap-6 mx-6 mt-5 relative">
        <div>
          <LeftSideAds />
        </div>
        <div className="flex-grow">
          <PageHeader heading="Our Blog" text="Checkout Something Cool" />
          <Blog data={data}>
            {meta!.pagination.start + meta!.pagination.limit <
              meta!.pagination.total && (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400 bg-blue-400 my-5"
                  onClick={loadMorePosts}
                >
                  Load more posts...
                </button>
              </div>
            )}
          </Blog>
          <UpperAds />
        </div>
        <div>
          <RightSideAds />
        </div>
      </div>
    </>
  );
}
