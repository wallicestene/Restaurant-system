/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Restaurant from "./Restaurant";
import useFetch from "../hooks/useFetch";
import { Skeleton } from "@mui/material";
import Filter from "./Filter";
import { toast } from "sonner";

const RestaurantContainer = () => {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState(null);
  const { data, isLoading: initialLoading, error: initialError } = useFetch(
    "http://localhost:3000/api/restaurant"
  );

  useEffect(() => {
    setLoading(initialLoading);
    setSearchError(initialError);
  }, [initialLoading, initialError]);

  const searchRestaurant = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/search/restaurant/?query=${searchInput}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setSearchData(result);
        setLoading(false);
        setSearchError(null);
        if (result.length === 0) {
          setSearchError("No restaurant found!");
          toast.error("No restaurant found!")
        }
      })
      .catch((error) => {
        setSearchError(error.message);
        setLoading(false);
      });
  };
  return (
    <section className=" ">
      <Filter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchRestaurant={searchRestaurant}
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-x-5 md:gap-x-10 gap-x-5 gap-y-10 lg:py-7 py-5 px-5 lg:px-10">
        {loading &&
          skeleton.map((skeleton, index) => (
            <div key={index}>
              <Skeleton variant="rounded" width="100%" height={150} />
              <Skeleton width="90%" />
              <Skeleton width="60%" />
            </div>
          ))}
        {initialError && <p>{initialError}</p>}
        {!loading &&
          (searchData.length > 0 ? (
            searchData.map((restaurant) => (
              <Restaurant key={restaurant._id} restaurant={restaurant} />
            ))
          ) : (
            data.map((restaurant) => (
              <Restaurant key={restaurant._id} restaurant={restaurant} />
            ))
          ))}
      </div>
    </section>
  );
};

export default RestaurantContainer;
