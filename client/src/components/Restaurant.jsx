import React from 'react'

const Restaurant = ({restaurant}) => {
  return (
    <div>
        <div className="h-fit">
      <div className="h-fit w-full border font-Montserrat rounded-xl overflow-hidden bg-white shadow-md">
        <img
          src={restaurant.images[0]}
          className=" h-32 w-full object-cover"
          alt=""
        />
        <div className=" p-2">
          <h1 className=" font-bold ">{restaurant.name}</h1>
          <div className="flex flex-col gap-5 text-sm text-gray-500">
            <p>{restaurant.address}</p>
            <p>
              Starts from: <span className=" font-bold text-black">$2450</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Restaurant