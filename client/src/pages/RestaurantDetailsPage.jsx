import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  return (
    <section className="h-screen w-11/12 mx-auto">
      <div className="pt-12 pb-2">
        <h1 className=" font-bold font-Montserrat text-lg text-totem-pole-600">{data.name}</h1>
      </div>
      <div className="grid grid-cols-2 w-11/12 mx-auto gap-4 rounded-xl overflow-hidden h-72 ">
        <div className=" h-72 relative">
          <img
            src={data.images[0]}
            className="absolute inset-0 w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="h-72  grid grid-cols-2 gap-2">
          {data.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="h-36 w-full relative overflow-hidd rou"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            >
              <img
                src={image}
                className="absolute inset-0 h-full w-full object-cover"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetailsPage;
