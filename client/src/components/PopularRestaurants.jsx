import React, { useState } from "react";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocationOn,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const PopularRestaurants = ({ restaurant }) => {
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
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <div>
      <div className=" h-36">
        <div className=" h-36 grid grid-cols-2 w-full font-Montserrat rounded-xl overflow-hidden bg-white shadow-lg shadow-totem-pole-200">
          <div className=" h-36 w-full relative group">
            <img
              src={images[value]}
              className=" h-full w-full object-cover"
              alt={restaurant?.name}
            />
            {images.length > 1 && (
              <div className="group-hover:opacity-100 opacity-0 absolute top-1/2 px-1 w-full -translate-y-1/2 flex justify-between transition-opacity duration-500 delay-200 ease-in-out">
                <span
                  onClick={goToPreviousImage}
                  className=" h-6 w-6 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full"
                >
                  <KeyboardArrowLeft />
                </span>
                <span
                  onClick={goToNextImage}
                  className=" h6 w-6 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full"
                >
                  <KeyboardArrowRight />
                </span>
              </div>
            )}
          </div>
          <div className="  px-1 text-xs flex flex-col justify-between ">
            <div>
              <Link to={`/restaurant/${restaurant._id}`}>
                <h2 className="text-totem-pole-600 tracking-tight text-base font-bold hover:underline">
                  {restaurant?.name}
                </h2>
              </Link>
            </div>
            <div>
              <p>{truncate(restaurant?.description, 70)}</p>
            </div>
            <div className=" flex flex-col-reverse gap-1">
              <p>
                <LocationOn
                  sx={{
                    fontSize: "1rem",
                  }}
                />
                {restaurant.address}
              </p>
              <p>Starts from: $2450</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRestaurants;
