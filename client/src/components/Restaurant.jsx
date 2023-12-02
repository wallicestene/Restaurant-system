/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
    <div className=" grid grid-cols-1 grid-rows-4 lg:h-64 h-80 overflow-hidden bg-white rounded-xl shadow-lg">
      <Carousel
        showThumbs={false}
        emulateTouch
        stopOnHover
        interval={5000}
        useKeyboardArrows={true}
        className=" overflow-hidden row-span-3 object-cover group "
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <span
              onClick={onClickHandler}
              className=" h-8 w-8 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300 ease-linear bg-opacity-80"
            >
              <KeyboardArrowLeft />
            </span>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <span
              onClick={onClickHandler}
              className=" h-8 w-8 flex items-center justify-center bg-totem-pole-500 text-totem-pole-100 rounded-full cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300 ease-linear bg-opacity-80"
            >
              <KeyboardArrowRight />
            </span>
          )
        }
      >
        {images.map((image, index) => (
          <Link key={index} to={`/restaurant/${restaurant._id}`}>
            <div className=" h-full w-full  overflow-hidden ">
              <img
                src={`http://localhost:3000/uploads/${image}`}
                alt={` image ${images.length - 1}`}
                className=" lg:h-48 h-64 object-cover"
              />
            </div>
          </Link>
        ))}
      </Carousel>
      <div className=" row-span-1 flex flex-col justify-end py-1 px-3 font-mulish">
        <div className=" text-totem-pole-500 font-bold tracking-wide lowercase first-letter:uppercase ">
          <h2>{restaurant.name}</h2>
        </div>
        <div className=" text-sm text-gray-600">
          <p>
            <LocationOn
              sx={{
                fontSize: "1.2rem",
              }}
            />
            <span>{restaurant.address}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
