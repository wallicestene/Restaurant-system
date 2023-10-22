import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

import {
  Backspace,
  FavoriteBorder,
  KeyboardBackspace,
  LocationOn,
  TableRestaurant,
} from "@mui/icons-material";
import Datepicker from "react-tailwindcss-datepicker";
import { Alert, CircularProgress } from "@mui/material";
const RestaurantDetailsPage = () => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableError, setTableError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  console.log(data);
  useEffect(() => {
    const getTables = () => {
      if (data && !isLoading && !error) {
        fetch(`http://localhost:3000/api/tables/restaurant/${data._id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            } else {
              return response.json();
            }
          })
          .then((tables) => {
            setLoading(false);
            setTables(tables);
            setTableError(null);
          })
          .catch((error) => {
            setTableError(error.message);
            setLoading(false);
          });
      }
    };
    getTables();
  }, [data]);
  const BookTable = () => {
    fetch("http://localhost:3000/api/restaurant/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "6512e282eef3efdb30a69235",
        restaurantId: data._id,
        tableId,
        date: date.startDate,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setBookingError(result.error);
          alert(bookingError);
        } else {
          alert("Reservation Successful");
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div className=" py-16 w-11/12 mx-auto border font-mulish">
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}
      {!loading && !error && (
        <div className="w-9/12 mx-auto">
          <div>
            <div className="top  text-totem-pole-500 font-semibold  mt-5 lg:text-xl md:text-lg  my-5 first-letter:uppercase">
              <h1>{data?.name}</h1>
            </div>
          </div>
          <div
            className={`top grid grid-cols-2 mx-auto gap-2 h-72 overflow-hidden rounded-xl ${
              data.images.slice(1).length == 1 ||
              (data.images.slice(1).length == 2 && "w-5/12")
            } ${data.images.length === 1 && " w-4/12 grid-cols-1"}`}
          >
            <div className="imgLeft">
              <img
                src={data?.images[0]}
                className=" h-full w-full object-cover"
                alt=""
              />
            </div>
            <div
              className={`imgright grid grid-cols-2 bg- gap-2 h-72 w-full overflow-hidden ${
                data.images.slice(1).length <= 2 && " grid-cols-1"
              }`}
            >
              {data?.images.slice(1).map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={image}
                    alt={data?.name}
                    className="h-36 w-full  object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className=" w-9/12 mx-auto grid grid-cols-3 ">
        <div className=" col-span-2 p-2">
          <div className=" my-5">
            <p className="text-sm text-gray-800 font-semibold flex items-center">
              <LocationOn
                sx={{
                  fontSize: "1.4rem",
                }}
              />
              <span>{data.address}</span>
            </p>
          </div>
          <div
            style={{
              height: "0.01rem",
            }}
            className=" bg-gray-800"
          />
          <div className="my-5 px-2">
            <h2 className=" my-2 text-lg font-bold">Menu</h2>

            {data && !isLoading && (
              <div className="flex gap-2 flex-wrap py-2 px-3">
                {data.menu.map((menuItem) => (
                  <div className=" flex items-center gap-1 w-48 border border-totem-pole-400 py-1 px-2 rounded-md">
                    <img
                      src={menuItem.itemImage}
                      alt={menuItem.itemName}
                      className=" h-16 w-16 rounded-full object-cover"
                    />
                    <p>{menuItem.itemName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              height: "0.01rem",
            }}
            className=" bg-gray-800"
          />
          <div className="my-5 px-2">
            <h2 className=" my-2 text-lg font-bold">About this place</h2>
            <p className="text-md text-gray-900">{data?.description}</p>
          </div>
          <div
            style={{
              height: "0.01rem",
            }}
            className=" bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
