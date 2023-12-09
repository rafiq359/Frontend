"use client";
import React from "react";
import LeftSideAds from "./LeftSideAds";
import RightSideAds from "./RightSideAds";
import Link from "next/link";

interface AllTools {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
  };
}

function AllTools({
  data: tools,
  children,
}: {
  data: AllTools[];
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex gap-6 mx-6 mt-5 relative">
        <div>
          <LeftSideAds />
        </div>
        <div className="flex-grow">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
            {tools.map((tool, index) => (
              <Link href={`tools/${tool.attributes.slug}`} key={index}>
                <div className="bg-blue-200 p-3 rounded-md shadow-lg">
                  {tool.attributes.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <RightSideAds />
        </div>
      </div>
    </div>
  );
}

export default AllTools;
