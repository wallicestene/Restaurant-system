import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocationOn,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <div className=" h-60 w-full font-Montserrat rounded-xl overflow-hidden bg-white">
          <div className=" h-1/2  relative group">
            <img
              src={images[value]}
              className=" h-full w-full object-cover"
              alt={restaurant.name}
            />
            {images.length > 1 && (
              <div className="group-hover:opacity-100 opacity-0 absolute top-1/2 px-1 w-full -translate-y-1/2 flex justify-between transition-opacity duration-500 delay-200 ease-in-out">
                <span
                  onClick={goToPreviousImage}
                  className=" h-7 w-7 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer"
                >
                  <KeyboardArrowLeft />
                </span>
                <span
                  onClick={goToNextImage}
                  className=" h-7 w-7 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer"
                >
                  <KeyboardArrowRight />
                </span>
              </div>
            )}
          </div>
          <div className=" lg:py-3 lg:px-4  py-1 px-3 md:py-3 md:px-4 text-totem-pole-600">
            <Link to={`/restaurant/${restaurant._id}`}>
              <h1 className=" font-bold hover:underline hover:cursor-pointer lg:text-base md:text-base text-sm">
                {restaurant.name}
              </h1>
            </Link>
            <div className="flex flex-col gap-5 text-sm text-gray-500">
              <p className=" flex items-center gap-x-1">
                <LocationOn
                  sx={{
                    fontSize: "1rem",
                  }}
                />
                <span>{restaurant.address}</span>
              </p>
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
