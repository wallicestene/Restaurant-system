/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import useFetch from "../hooks/useFetch";
import { Skeleton } from "@mui/material";

const RestauarantContainer = () => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { data, isLoading, error } = useFetch(
    "http://localhost:3000/api/restaurant"
  );
  return (
    <section className=" ">
      <div className="grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 lg:gap-x-10 gap-x-5 gap-y-10 lg:py-7 lg:px-5 py-5 px-2">
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
      
    </section>
  );
};

export default RestauarantContainer;
