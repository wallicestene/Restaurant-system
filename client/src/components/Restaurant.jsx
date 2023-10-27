import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocationOn,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
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
    <div className=" grid grid-cols-1 grid-rows-4 lg:h-64 h-80 overflow-hidden bg-white rounded-xl shadow-md">
       
        <Carousel
         showThumbs={false}
         autoPlay
         emulateTouch
         stopOnHover
         interval={5000}
         showArrows={false}
         useKeyboardArrows={true}
        className=" overflow-hidden row-span-3 object-cover "
        >
          {
            images.map((image, index )=> (
              <div key={index} className=" h-full w-full  overflow-hidden ">
                <img src={image} alt={` image ${images.length -1}`} className=" lg:h-48 h-64 object-cover"/>
              </div>
              
            ))
          }
        </Carousel>
  
       <div className="lowerdiv row-span-1 flex flex-col justify-end py-2 px-3">
        <div>
        <h2>{restaurant.name}</h2>
        </div>
        <div>
          <p><LocationOn />{restaurant.address}</p>
        </div>
       </div>
    </div>
  );
};

export default Restaurant;
