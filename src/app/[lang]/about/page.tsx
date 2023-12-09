import React from "react";
import LeftSideAds from "../components/LeftSideAds";
import RightSideAds from "../components/RightSideAds";
import UpperAds from "../components/UpperAds";

function index() {
  return (
    <div className="container mx-auto">
      <div className="flex gap-6 mx-6 mt-5 relative">
        <div>
          <LeftSideAds />
        </div>
        <div className="flex-grow">
          <h1 className="text-[38px] font-bold text-center my-5">About Us</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Doloremque, delectus quos tenetur labore reprehenderit
            exercitationem ipsa. Inventore asperiores similique corporis,
            tempore laudantium quis, doloribus doloremque, pariatur error
            tempora perspiciatis saepe.
          </p>
          <UpperAds />
        </div>
        <div>
          <RightSideAds />
        </div>
      </div>
    </div>
  );
}

export default index;
