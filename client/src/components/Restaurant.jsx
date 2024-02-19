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
    <div className=" flex flex-col gap-y-1 h-full rounded-t-2xl overflow-hidden bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]  rounded-xl transition-shadow duration-200 delay-100 ease-linear  font-Mulish">
      <Carousel
        showStatus={false}
        showThumbs={false}
        emulateTouch
        stopOnHover
        interval={5000}
        transitionTime={650}
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={10}
        useKeyboardArrows={true}
        className=" overflow-hidden object-cover group rounded-2xl "
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <span
              onClick={onClickHandler}
              className=" h-8 w-8 flex items-center justify-center bg-white rounded-full cursor-pointer absolute top-1/2 left-3 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300 ease-linear"
            >
              <KeyboardArrowLeft />
            </span>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <span
              onClick={onClickHandler}
              className=" h-8 w-8 flex items-center justify-center bg-white rounded-full cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity delay-150 duration-300 ease-linear"
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
                src={image}
                alt={` image ${index + 1}`}
                className=" lg:h-72 h-[360px] object-cover brightness-[0.9]"
              />
            </div>
          </Link>
        ))}
      </Carousel>
      <div className="flex flex-col justify-between text-start p-2 ">
        <Link to={`/restaurant/${restaurant._id}`}>
          <div className=" flex items-center justify-start gap-1 text-[0.97rem]">
            <LocationOn
              sx={{
                fontSize: "1.1rem",
              }}
            />
            <h1 className="font-semibold">
              <span>{restaurant.address}</span>
            </h1>
          </div>
        </Link>
        <div className=" flex  flex-col  gap-y-1 justify-between h-full text-sm">
          <div className=" flex flex-row gap-x-2 gap-y-1 flex-wrap text-gray-600">
            {restaurant.tags.slice(0, 5).map((tag, index) => (
              <div
                key={index}
                className=" border border-totem-pole-500 py-1 px-2 rounded"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className=" text-[0.97rem]">
            <p>
              <span className=" font-semibold">
                {(restaurant?.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
              </span>
              <span>night</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
