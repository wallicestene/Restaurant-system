import React, { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import useFetch from "../hooks/useFetch";
import { Box, Skeleton } from "@mui/material";

const RestauarantContainer = () => {
  const skeleton = [1, 2, 3];
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/restaurant"
  );
  return (
    <section className="lg:flex md:flex gap-5">
      {error ? (
        <div>{error}</div>
      ) : (
        <div className=" lg:flex-7 md:flex-7 grid lg:grid-cols-3  md:grid-cols-2  grid-cols-2 lg:gap-x-5 gap-x-5 gap-y-10 bg-gray-100 lg:py-7 lg:px-5 py-5 px-2  rounded-lg">
          {isLoading ? (
            <>
              {skeleton.map((skeleton, index) => (
                <div key={index}>
                   <Skeleton  variant="rounded" width="100%" height={150} />
                  <Skeleton width="90%" />
                  <Skeleton width="60%" />
                </div>
              ))}
            </>
          ) : (
            data.map((restaurant, index) => (
              <Restaurant key={index} restaurant={restaurant} />
            ))
          )}
        </div>
      )}
      <div className=" hidden lg:flex-3 md:flex-3 lg:flex md:flex flex-col gap-y-1 bg-gray-100 py-3 px-5 rounded-lg">
        <h1 className=" font-bold">Popular Restaurants</h1>
        <div className=" flex flex-col gap-5"></div>
      </div>
    </section>
  );
};

export default RestauarantContainer;
