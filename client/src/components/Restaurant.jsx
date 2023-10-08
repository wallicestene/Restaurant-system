import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const Restaurant = ({ restaurant }) => {
  const [value, setValue] = useState(0);
  const [images, setImages] = useState(restaurant.images);

  const goToNextImage = () => {
    if (value < images.length - 1) {
      setValue((prevValue) => prevValue + 1);
    } else {
      setValue(0);
    }
  };
  const goToPreviousImage = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    } else {
      setValue(images.length - 1);
    }
  };
  return (
    <div>
      <div className="h-fit ">
        <div className="h-fitw w-full font-Montserrat rounded-xl overflow-hidden bg-white shadow-lg shadow-totem-pole-200 text-totem-pole-600 hover:cursor-pointer">
          <div className=" h-32 relative">
            <img
              src={restaurant.images[value]}
              className=" h-full w-full object-cover"
              alt=""
            />
            <div className="absolute top-1/2 w-full  -translate-y-1/2 flex justify-between">
              <span
                onClick={goToPreviousImage}
                className=" h-6 w-6 flex items-center justify-center bg-gray-300 rounded-full"
              >
                <KeyboardArrowLeft />
              </span>
              <span
                onClick={goToNextImage}
                className=" h-6 w-6 flex items-center justify-center bg-gray-300 rounded-full"
              >
                <KeyboardArrowRight />
              </span>
            </div>
          </div>
          <div className=" p-2">
            <h1 className=" font-bold ">{restaurant.name}</h1>
            <div className="flex flex-col gap-5 text-sm text-gray-500">
              <p>{restaurant.address}</p>
              <p>
                Starts from:{" "}
                <span className=" font-bold text-black">$2450</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
