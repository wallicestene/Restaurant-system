/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import useFetch from "../hooks/useFetch";
import { Skeleton } from "@mui/material";
import PopularRestaurants from "./PopularRestaurants";

const RestauarantContainer = () => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/restaurant"
  );
  return (
    <section className="lg:flex md:flex gap-5 ">
      <div className=" h-screen overflow-y-scroll lg:flex-7 md:flex-7 grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 lg:gap-x-5 gap-x-5 gap-y-10 bg-slate-300 lg:py-7 lg:px-5 py-5 px-2  rounded-lg">
        {isLoading &&
          skeleton.map((skeleton, index) => (
            <div key={index}>
              <Skeleton variant="rounded" width="100%" height={150} />
              <Skeleton width="90%" />
              <Skeleton width="60%" />
            </div>
          ))}
        {error && <p>{error}</p>}
        {!isLoading &&
          data.map((restaurant) => (
            <Restaurant key={restaurant._id} restaurant={restaurant} />
          ))}
      </div>
      <div className=" hidden  lg:flex-3 md:flex-3 lg:flex md:flex flex-col gap-y-1 bg-slate-300 py-3 px-5 rounded-lg ">
        <h1 className=" font-bold">Popular Restaurants</h1>
        <div className="popular h-screen overflow-scroll py-2 flex flex-col gap-5">
          {isLoading &&
            skeleton.map((skeleton, index) => (
              <div key={index}>
                <Skeleton variant="rounded" width="100%" height={150} />
                <Skeleton width="90%" />
                <Skeleton width="60%" />
              </div>
            ))}
          {error && <p>{error}</p>}
          {!isLoading &&
            data.map((restaurant, index) => (
              <PopularRestaurants
                key={restaurant._id}
                restaurant={restaurant}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default RestauarantContainer;
