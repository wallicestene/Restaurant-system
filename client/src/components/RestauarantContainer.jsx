import React, { useEffect, useState } from "react";
import Restaurant from "./Restaurant";

const RestauarantContainer = () => {
    const [restaurants,setRestaurants] = useState([])
    useEffect(() =>{
        fetch("http://localhost:3000/api/restaurant")
        .then(result => result.json())
        .then(data =>{
            setRestaurants(data)
            console.log(data);
        })
    },[])
  return (
    <section className="lg:flex md:flex gap-5">
      <div className=" lg:flex-7 md:flex-7 grid lg:grid-cols-3  md:grid-cols-2  grid-cols-2 lg:gap-x-5 gap-x-5 gap-y-10 bg-gray-100 lg:py-7 lg:px-5 py-5 px-2  rounded-lg">
        {
            restaurants.map((restaurant, index) => (
                <Restaurant key={index} restaurant={restaurant}/>
            ))
        }
        {/* <Restaurant />
        <Restaurant />
        <Restaurant />
        <Restaurant />
        <Restaurant /> */}
      </div>
      <div className=" hidden lg:flex-3 md:flex-3 lg:flex md:flex flex-col gap-y-1 bg-gray-100 py-3 px-5 rounded-lg">
        <h1 className=" font-bold">Popular Restaurants</h1>
        <div className=" flex flex-col gap-5">
          {/* <Restaurant />
          <Restaurant /> */}
        </div>
      </div>
    </section>
  );
}

export default RestauarantContainer


