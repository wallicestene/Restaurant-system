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
          <div className=" grid place-items-center">
          <div className=" flex flex-col items-center flex-wrap gap-3 w-fit justify-center">
            <div className=" h-72 w-96 rounded-xl overflow-hidden ">
              <img src={data.images[value]} className=" h-full w-full object-cover" alt={data.name} />
            </div>
            <div className=" flex flex-row flex-wrap gap-3">
              {
                data.images.map((image, index) => (
                  <img key={index} src={image} onClick={() => setValue(index)} className={` h-16 w-16 hover:cursor-pointer object-cover rounded-lg ${value == index && " opacity-50 "}`} alt="" />
                ))
              }
            </div>
          </div></div>
        </div>
      )}
    </section>
  );
};

export default RestaurantDetailsPage;
