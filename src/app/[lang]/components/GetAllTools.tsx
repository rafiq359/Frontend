"use client";
import React from "react";
import UpperAds from "./UpperAds";
import LeftSideAds from "./LeftSideAds";
import DropZone from "./dropZone";
import Link from "next/link";
import RightSideAds from "./RightSideAds";
interface Tools {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    name: string;
    about_tool: string;
    RelatedTools: any;
    about_heading: string;
    upload_desc: string;
    upload_text: string;
    file_ext: string;
    send_file_format: string;
  };
}
function GetAllTools({ data, params }: { data: Tools; params: any }) {
  const {
    name,
    description,
    about_tool,
    about_heading,
    RelatedTools,
    upload_text,
    upload_desc,
    file_ext,
    send_file_format,
  } = data.attributes;

  const btnText = {
    title: upload_text,
    desc: upload_desc ,
    fileExt: file_ext,
    params: params,
    file_format: send_file_format,
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl md:text-[38px] my-5">
        {name}
      </h1>
      <p className="text-center text-lg text-[#919296]">{description}</p>
      <div className="my-3">
        <UpperAds />
      </div>
      <div className="flex gap-6 mx-6 mt-5 relative">
        <div>
          <LeftSideAds />
        </div>
        <div className="flex-grow">
          <div>
            <DropZone btnText={btnText} />
          </div>
          <div className="my-5 shadow-lg p-3 border-2 border-blue-300 rounded-md">
            <h3 className="text-lg md:text-[28px] my-3 font-medium">
              {about_heading}
            </h3>
            <p className="text-[22px]md:text-[38px] font-medium">
              {about_tool}
            </p>
          </div>
          <div className="my-5 shadow-lg p-3 border-2 border-blue-300 rounded-md">
            <h3 className="text-lg md:text-[28px] my-3 font-medium ">
              {RelatedTools.RelatedTools}
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {RelatedTools.tools.data.map((tool: any, index: any) => (
                <Link key={index} href={`${tool.attributes.slug}`}>
                  <div className="grid-item bg-blue-300 rounded p-3 cursor-pointer">
                    {tool.attributes.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <RightSideAds />
        </div>
      </div>
    </>
  );
}

export default GetAllTools;
