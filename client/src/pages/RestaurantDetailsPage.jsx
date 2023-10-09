import React from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  return <div className="">{data.name}</div>;
};

export default RestaurantDetailsPage;
