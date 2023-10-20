import React, { useState } from 'react'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const PopularRestaurants = ({restaurant}) => {
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
    const truncate = (string, n)=>{
      return string?.length > n ? string.substr(0, n - 1) + "..." : string
  }
    return (
      <div>
        <div className="">
          <div className=" h-36 grid grid-cols-2 gap-2 w-full font-Montserrat rounded-xl overflow-hidden bg-white shadow-lg shadow-totem-pole-200  hover:cursor-pointer">
            <div className=" h-36 w-full relative group">
              <img
                src={images[value]}
                className=" h-full w-full object-cover"
                alt={restaurant?.name}
              />
              {
                images.length > 1 && (
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
                )
              }
            </div>
            <div className=" h-full text-totem-pole-600">
              <h1 className=" font-bold first-letter:uppercase text-start">{restaurant.name.toLowerCase()}</h1>
              <div className="bg-slate-0 text-xs text-gray-500">
               <div className=' w-full'>
               <p>{truncate(restaurant?.description, 70)}</p>
               </div>
                <div>
                <p>{restaurant?.address}</p>
                </div>
                <div>
                  <p>
                  Starts from:{" "}
                  <span className=" font-bold text-black">$2450</span>
                </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PopularRestaurants