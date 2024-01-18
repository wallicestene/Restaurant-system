/* eslint-disable no-unsafe-optional-chaining */
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
    <div className=" flex flex-col gap-y-1 h-full overflow-hidden bg-white rounded-xl shadow-md shadow-gray-300 hover:shadow-gray-400 transition-shadow duration-200 delay-100">
      <Carousel
        showThumbs={false}
        emulateTouch
        stopOnHover
        interval={5000}
        useKeyboardArrows={true}
        className=" overflow-hidden object-cover group rounded-xl "
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
                className=" lg:h-64 h-64 object-cover"
              />
            </div>
          </Link>
        ))}
      </Carousel>
      <div className="flex flex-col justify-between text-start p-1 font-mulish">
        <Link to={`/restaurant/${restaurant._id}`}>
          <div className=" font-bold tracking-wide first-letter:uppercase ">
            <h2>{restaurant.name}</h2>
          </div>
        </Link>
        <div className=" flex  flex-col  gap-y-1 justify-between h-full text-sm">
          <div className=" flex flex-row gap-x-2 gap-y-1 flex-wrap">
            {restaurant.tags.slice(0, 5).map((tag, index) => (
              <div
                key={index}
                className=" border border-totem-pole-500 py-1 px-2 rounded"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className=" ">
            <p>
              <span>
                {(restaurant?.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                night
              </span>
            </p>
          </div>
          <div className=" flex items-center justify-start gap-1  text-gray-600">
            <LocationOn
              sx={{
                fontSize: "1.1rem",
              }}
            />
            <p>
              <span>{restaurant.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
