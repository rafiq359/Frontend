"use client";

import React, { useState } from "react";

function DropZone({ btnText }: any) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { title, desc, params, fileExt, file_format } = btnText;

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  console.log("selectedfile", selectedFile);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append(`${file_format}`, selectedFile);
    console.log("formData", formData);
    let endPoint =
      params && params.slug
        ? `http://127.0.0.1:5000/${params.slug}`
        : "http://127.0.0.1:5000/pdf2dxf";

    try {
      fetch(endPoint, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          // Create a link element to trigger the download
          if (btnText && btnText.fileExt) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `output.${fileExt}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error("btnText or btnText.fileExt is undefined");
          }
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center bg-blue-100 dark:bg-darkPrimary-600 p-3">
            <div className="w-full h-full py-10 px-4 bg-blue-200 flex items-center justify-center border-4 border-blue-300 border-dashed">
              <div className="flex flex-col items-center text-sm md:text-base">
                <svg
                  width="55"
                  height="55"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dark:fill-white fill-white"
                >
                  <path d="M44.9151 0.820312H11.0855C5.42482 0.820312 0.819824 5.42531 0.819824 11.0859V44.9156C0.819824 50.5762 5.42482 55.1803 11.0855 55.1803H44.9151C50.5748 55.1803 55.1798 50.5753 55.1798 44.9156V11.0859C55.1798 5.42531 50.5748 0.820312 44.9151 0.820312ZM11.0855 2.69531H44.9151C49.5417 2.69531 53.3048 6.45938 53.3048 11.0859V42.6525L46.3476 35.6953C45.4645 34.8113 44.2851 34.3237 43.027 34.3237C41.7698 34.3237 40.5905 34.8113 39.7073 35.6944L31.7939 43.5966L15.9998 27.8025C15.1167 26.9184 13.942 26.4319 12.6933 26.4319C11.4445 26.4319 10.2708 26.9194 9.3867 27.8025L2.69576 34.4934V11.0859C2.69482 6.45844 6.45795 2.69531 11.0855 2.69531ZM2.69482 44.9156V37.1447L10.7114 29.1281C11.7717 28.0678 13.6139 28.0688 14.6742 29.1281L38.8523 53.3053H11.0855C6.45795 53.3053 2.69482 49.5422 2.69482 44.9156ZM44.9151 53.3053H41.5026L33.1205 44.9231L41.033 37.0209C42.0942 35.9606 43.9626 35.9616 45.022 37.0209L53.2861 45.285C53.0911 49.7391 49.417 53.3053 44.9151 53.3053Z"></path>
                  <path d="M28.0137 20.7667C31.4177 20.7667 34.1861 17.9973 34.1861 14.5942C34.1861 11.1761 31.4177 8.39453 28.0137 8.39453C24.5955 8.39453 21.814 11.1752 21.814 14.5942C21.813 17.9973 24.5946 20.7667 28.0137 20.7667ZM28.0137 10.2686C30.3827 10.2686 32.3111 12.2083 32.3111 14.5933C32.3111 16.9633 30.3827 18.8908 28.0137 18.8908C25.6287 18.8908 23.689 16.9623 23.689 14.5933C23.688 12.2092 25.6287 10.2686 28.0137 10.2686Z"></path>
                </svg>

                <div className="relative cursor-pointer flex-cols flex bg-slate-50 dark:bg-darkSurface-200 rounded-md mt-8 select-none">
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  className="my-3 bg-blue-400 p-3 rounded-md text-white font-medium"
                  onClick={handleFileUpload}
                >
                  {title}
                </button>
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropZone;
