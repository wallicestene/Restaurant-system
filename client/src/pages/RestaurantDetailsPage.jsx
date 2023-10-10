import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const [value, setValue] = useState(0)
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  return (
    <section className="h-screen w-11/12 mx-auto">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading....</p>}
      {!isLoading && (
        <div>
          <div className="pt-12 pb-2">
            <h1 className=" font-bold font-Montserrat text-lg text-totem-pole-600">
              {data?.name}
            </h1>
          </div>
          <div className=" grid grid-cols-2 place-items-center p-1">
          <div className=" flex flex-col items-center flex-wrap gap-3 w-full justify-center ">
            <div className=" h-64 w-96 rounded-xl overflow-hidden ">
              <img src={data.images[value]} className=" h-full w-full object-cover" alt={data.name} />
            </div>
            <div className=" flex flex-row flex-wrap gap-3 ">
              {
                data.images.map((image, index) => (
                  <div key={index} className={` h-16 w-16 rounded-lg overflow-hidden ${value == index && " border-2 border-totem-pole-500 "}`}>
                    <img  src={image} onClick={() => setValue(index)} className={` h-full w-full hover:cursor-pointer object-cover ${value == index && " opacity-60"}`} alt="" />
                  </div>
                  
                ))
              }
            </div>
          </div>
          <div className=" bg-slate-400 h-full w-full">
            hello
          </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantDetailsPage;
