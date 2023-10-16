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
    <section className="h-screen w-11/12 mx-auto flex flex-col justify-center">
      <div
        className=" hover:cursor-pointer my-1 flex items-center font-Montserrat text-sm"
        onClick={() => {
          navigate(-1);
        }}
      >
        <div>
          <KeyboardBackspace sx={{ fontSize: "1.3rem" }} />
        </div>
        <div>Back</div>
      </div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading....</p>}
      {!isLoading && (
        <div>
          <div className="">
            <h1 className=" font-bold font-Montserrat text-lg text-totem-pole-500">
              {data?.name}
            </h1>
          </div>
          <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-items-center p-1">
            <div className=" flex flex-col items-center flex-wrap gap-3 w-full justify-center ">
              <div className="relative h-64 lg:w-96 md:w-96 w-full rounded-xl overflow-hidden ">
                <img
                  src={data.images[value]}
                  className=" h-full w-full object-cover"
                  alt={data.name}
                />
                <div className=" absolute bottom-5 left-5 flex items-center gap-1 text-slate-900 backdrop-blur-sm bg-white/50 px-2 font-mulish rounded py-1">
                  <span>
                    <LocationOn sx={{ fontSize: "1.3em" }} />
                  </span>
                  <p>{data.address}</p>
                </div>
              </div>
              <div className=" flex flex-row flex-wrap justify-center gap-3 w-full">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className={` lg:h-16 lg:w-16 md:h-16 md:w-16 lg:rounded-lg md:rounded-lg overflow-hidden ${
                      value == index &&
                      " lg:border-2 md:border-2 border-totem-pole-500 "
                    }`}
                  >
                    <img
                      src={image}
                      onClick={() => setValue(index)}
                      className={` lg:flex md:flex hidden  h-full w-full hover:cursor-pointer object-cover  ${
                        value == index && " opacity-60"
                      }`}
                      alt=""
                    />
                    <div
                      key={index}
                      onClick={() => setValue(index)}
                      className={` border h-4 w-4 border-totem-pole-500 rounded-full cursor-pointer ${
                        value == index && " bg-totem-pole-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" container h-full w-full  px-2 font-mulish py-2 border border-totem-pole-500 rounded-lg flex flex-col justify-between gap-3">
              {tableError && <p>{error}</p>}
              {loading && <p>Loading...</p>}
              {!loading && tables.length > 0 && (
                <div>
                  <div className=" bg-totem-pole-500 w-fit p-1 rounded-md text-totem-pole-100 my-1 ">
                    <h1>Tables</h1>
                  </div>
                  <div className="flex font-Montserrat items-center gap-5 overflow-x-scroll snap-x snap-mandatory px-2">
                    {tables.map((table, index) => (
                      <button
                        onClick={() => setTableId(table._id)}
                        disabled={table.occupied}
                        key={index}
                        className={` relative bg-green-800 flex-shrink-0  text-sm text-totem-pole-100 justify-center h-20 w-28 flex flex-col items-center px-1 rounded-md ${
                          table.occupied && " bg-red-700 "
                        } overflow-hidden`}
                      >
                        <span>0{table.number}</span>
                        <TableRestaurant />
                        <span>Guests: {table.capacity}</span>
                        {table.occupied && (
                          <div className=" absolute top-0 bottom-0 h-full w-full grid place-items-center bg-red-600 bg-opacity-50">
                            <span className=" border border-totem-pole-100 px-2">
                              Reserved
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h1 className=" bg-totem-pole-500 p-1 rounded-md text-totem-pole-100 my-1 w-fit">
                  Overview
                </h1>
                <div className=" text-sm font-mulish">
                  <p>{data.description}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-evenly py-2 ">
                  <div className=" flex items-center hover:outline-dotted py-1.5 px-0.5 outline-red-500 rounded-md">
                    <span>
                      <LocationOn sx={{ fontSize: "1.3em" }} />
                    </span>
                    <p>{data.address}</p>
                  </div>
                  <div className=" flex items-center py-1.5 px-0.5 rounded-md">
                    <p>Starts From: 1,231</p>
                  </div>
                </div>
              </div>
              <div>
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={date}
                  onChange={handleDateChange}
                  popoverDirection="up"
                  primaryColor={"orange"}
                />
              </div>
              <div className=" flex lg:flex-row md:flex-row flex-col items-center justify-between lg:gap-5 md:gap-3 gap-2 text-totem-pole-100">
                <button
                  className=" w-full bg-green-700 py-2 rounded-md hover:opacity-80 opacity-100 transition-opacity duration-200 delay-200"
                  onClick={BookTable}
                >
                  Book Now
                </button>
                <button className=" w-full bg-totem-pole-500 py-2 rounded-md flex items-center justify-center gap-1 hover:opacity-80 opacity-100 transition-opacity duration-200 delay-200">
                  <FavoriteBorder
                    sx={{
                      fontSize: "1.3em",
                    }}
                  />
                  <span>Add to Favourites</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RestaurantDetailsPage;
