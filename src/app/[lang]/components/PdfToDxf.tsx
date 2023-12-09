"use client";

import React, { ChangeEvent, useState } from "react";
import DropZone from "../components/dropZone";
import UpperAds from "../components/UpperAds";
import RightSideAds from "../components/RightSideAds";
import LeftSideAds from "../components/LeftSideAds";
import Link from "next/link";
import Features from "./Features";
function Home({ data }: { data: any }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index: any) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log("data", data);
  const btnText = {
    title: data.data[0].attributes.upload_text,
    desc: data.data[0].attributes.upload_desc,
   
    fileExt: data.data[0].attributes.file_ext,
    sending_file_format: data.data[0].attributes.send_file_format,
  };

  return (
    <>
      <h1 className="text-center font-bold text-xl md:text-[38px] my-5">
        {data.data[0].attributes.name}
      </h1>
      <p className="text-center text-lg text-[#919296]">
        {data.data[0].attributes.description}
      </p>
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
              {data.data[0].attributes.about_heading}
            </h3>
            <p className="text-[22px]md:text-[38px]">
              {data.data[0].attributes.about_tool}
            </p>
            <p className="text-[22px]md:text-[38px] my-2">
              {data.data[0].attributes.about_tool2}
            </p>
          </div>
          <div className="my-5 shadow-lg p-3 border-2 border-blue-300 rounded-md">
            <h3 className="text-lg md:text-[28px] my-3 font-medium ">
              {data.data[0].attributes.RelatedTools.RelatedTools}
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {data.data[0].attributes.RelatedTools.tools.data.map(
                (tool: any, index: any) => (
                  <Link key={index} href={`tools/${tool.attributes.slug}`}>
                    <div className="grid-item bg-blue-300 rounded p-3 cursor-pointer">
                      {tool.attributes.title}
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
          <div>
            <Features
              data={{
                heading: data.data[0].attributes.featureHeading,
                description: "",
                feature: data.data[0].attributes.feature,
              }}
            />
          </div>
          <div className="md:pb-6">
            <p className="text-lg md:text-5xl font-bold text-center">
              {data.data[0].attributes.troubleshootingHeading}
            </p>
            <div className="my-7">
              {data.data[0].attributes.issues.map(
                (issue: { title: string; description: string }) => (
                  <>
                    <p className="my-3 text-lg font-medium">{issue.title}</p>
                    <p className="text-md">{issue.description}</p>
                  </>
                )
              )}
            </div>
          </div>
          <div className="">
            <p className="text-lg md:text-5xl font-bold text-center mb-7">
              {data.data[0].attributes.faqHeading}
            </p>
            <div className="my-7">
              {data.data[0].attributes.faqs.map(
                (
                  faq: { title: string; description: string },
                  index: number
                ) => {
                  return (
                    <div className="join join-vertical w-full" key={index}>
                      <div
                        className={`collapse collapse-arrow join-item border border-base-300 mb-3 ${
                          openIndex === index ? "open" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`my-accordion-${index}`}
                          checked={openIndex === index}
                          onClick={() => handleAccordionClick(index)}
                        />
                        <div className="collapse-title text-xl font-medium">
                          {faq.title}
                        </div>
                        <div className="collapse-content">
                          <p>{faq.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div className="my-3">
              <UpperAds />
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
export default Home;
