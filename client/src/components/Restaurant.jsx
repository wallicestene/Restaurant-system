import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocationOn,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Restaurant = ({ restaurant }) => {
  const [images, setImages] = useState(restaurant.images);
  return (
    <div className=" grid grid-cols-1 grid-rows-4 lg:h-64 h-80 overflow-hidden bg-white rounded-xl shadow-md">
      <Carousel
        showThumbs={false}
        autoPlay
        emulateTouch
        stopOnHover
        interval={5000}
        useKeyboardArrows={true}
        className=" overflow-hidden row-span-3 object-cover group "
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <span
              onClick={onClickHandler}
              className=" h-7 w-7 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-200 ease-linear"
            >
              <KeyboardArrowLeft />
            </span>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <span
              onClick={onClickHandler}
              className=" h-7 w-7 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 z-10"
            >
              <KeyboardArrowRight />
            </span>
          )
        }
      >
        {images.map((image, index) => (
          <div key={index} className=" h-full w-full  overflow-hidden ">
            <img
              src={image}
              alt={` image ${images.length - 1}`}
              className=" lg:h-48 h-64 object-cover"
            />
          </div>
        ))}
      </Carousel>

      <div className="lowerdiv row-span-1 flex flex-col justify-end py-2 px-3">
        <div>
          <h2>{restaurant.name}</h2>
        </div>
        <div>
          <p>
            <LocationOn />
            {restaurant.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
