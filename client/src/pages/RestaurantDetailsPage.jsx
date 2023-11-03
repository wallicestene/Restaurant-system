/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Backspace,
  Close,
  FavoriteBorder,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardBackspace,
  LocationOn,
  TableBar,
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
  const [showBookingMobile, setShowBookingMobile] = useState(false);
  const [showTables, setShowTables] = useState(false);
  const [tableError, setTableError] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("");

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
            // console.log(tables);
            setTableError(null);
          })
          .catch((error) => {
            setTableError(error.message);
            setLoading(false);
          });
      }
    };
    getTables();
  }, [data, error, isLoading]);
  const getSelectedTable = (id) => {
    setSelectedTable(tables.find((table) => table._id === id));
  };
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
    setSelectedTable("");
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <div className=" py-16 lg:w-11/12 md:w-11/12 mx-auto font-mulish relative px-2">
      <button
        className=" flex items-center text-sm hover:bg-totem-pole-100 w-fit py-1 px-2 rounded-md transition-colors delay-150 duration-300"
        onClick={() => navigate(-1)}
      >
        <span>
          <KeyboardBackspace
            sx={{
              fontSize: "1.3rem",
            }}
          />
        </span>
        <span>Back</span>
      </button>
      {error && <Alert severity="error">{error}</Alert>}
      {isLoading && <CircularProgress />}
      {!isLoading && !error && (
        <div className=" lg:w-11/12 md:w-11/12 mx-auto px-3">
          <div>
            <div className="top  text-totem-pole-500 font-semibold  mt-5 lg:text-xl md:text-lg  my-5 first-letter:uppercase tracking-wide">
              <h1>{data?.name}</h1>
            </div>
          </div>
          <div
            className={`top hidden lg:grid gap-2 h-72 overflow-hidden rounded-xl ${
              data?.images.length == 1 && "grid-cols-1 h-64 w-7/12 mx-auto"
            }
            ${
              data?.images.slice(1).length == 2 && "grid-cols-1 w-7/12  mx-auto"
            }
            ${
              data?.images.slice(1).length == 1 && "grid-cols-1 w-7/12  mx-auto"
            }
            ${data?.images.length > 1 && "grid-cols-2"}
            `}
          >
            <div className="imgLeft">
              <img
                src={data?.images[0]}
                className=" h-full w-full object-cover"
                alt=""
              />
            </div>
            <div
              className={`imgright grid bg- gap-2 h-72 w-full overflow-hidden ${
                data.images.slice(1).length <= 2 && " grid-cols-1"
              }
              ${data.images.slice(1).length >= 3 && "grid-cols-2"}
              `}
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
          {data && !isLoading && (
            <div>
              <Carousel
                showThumbs={false}
                autoPlay
                emulateTouch
                infiniteLoop
                stopOnHover
                interval={5000}
                showArrows={false}
                useKeyboardArrows={true}
                className=" relative lg:hidden rounded-lg overflow-hidden"
              >
                {data?.images.map((image, index) => (
                  <div key={index} className="  overflow-hidden h-64 w-full">
                    <img
                      src={image}
                      alt={data.name}
                      className=" w-full h-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      )}
      <div className=" lg:w-11/12 md:w-11/12 mx-auto grid lg:grid-cols-3 grid-cols-1 relative gap-x-2 py-9">
        <div className=" lg:col-span-2 p-2">
          {data && !isLoading && (
            <div className=" ">
              <p className="text-sm  font-semibold flex items-center">
                <LocationOn
                  sx={{
                    fontSize: "1.4rem",
                  }}
                />
                <span className=" tracking-wide">{data.address}</span>
              </p>
              <div
                style={{
                  height: "0.01rem",
                }}
                className=" bg-black opacity-20 my-5"
              />
            </div>
          )}

          {data && !isLoading && (
            <div className=" px-2">
              <h2 className=" my-2 text-lg font-bold tracking-wide">Menu</h2>
              <ul className="flex gap-2 flex-wrap py-2 px-3">
                {data.menu.map((menuItem, index) => (
                  <li
                    key={index}
                    className=" flex items-center gap-1 border border-totem-pole-400 py-1 px-2 rounded-md"
                  >
                    <img
                      src={menuItem.itemImage}
                      alt={menuItem.itemName}
                      className=" lg:h-16 lg:w-16 md:h-14 md:w-14 h-10 w-10 rounded-full object-cover"
                    />
                    <p className=" text-sm tracking-wide">
                      {menuItem.itemName}
                    </p>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  height: "0.01rem",
                }}
                className=" bg-black opacity-20 my-5"
              />{" "}
            </div>
          )}

          {data && !isLoading && (
            <div className=" px-2">
              <h2 className=" my-2 text-lg font-bold tracking-wide">Tags</h2>
              <ul className=" flex flex-wrap items-center gap-2 py-2 px-3">
                {data?.tags.map((tag, index) => {
                  return (
                    <li key={index}>
                      <p className=" py-2 px-3 rounded-md border border-totem-pole-400">
                        {tag}
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div
                style={{
                  height: "0.01rem",
                }}
                className=" bg-black opacity-20 my-5"
              />{" "}
            </div>
          )}

          {data && !isLoading && (
            <div className=" px-2">
              <h2 className=" my-2 text-lg font-bold tracking-wide">
                About this place
              </h2>
              <p className="text-md text-gray-900 text-sm tracking-wide">
                {data?.description}
              </p>
              <div
                style={{
                  height: "0.01rem",
                }}
                className=" bg-black opacity-20 my-5"
              />
            </div>
          )}

          {data && !isLoading && (
            <div className="my-5 px-2">
              <h2 className=" my-2 text-lg font-bold tracking-wide">
                Contacts
              </h2>

              <ul className=" flex flex-wrap items-center gap-2 py-2 px-3">
                {data?.contacts.map((contact, index) => {
                  return (
                    <li key={index}>
                      <p className=" py-2 px-3 rounded-md border border-totem-pole-400">
                        +254 {contact}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className=" lg:col-span-1 flex flex-col items-center">
          <div className="lg:hidden fixed bottom-2 right-4 flex justify-end items-end w-full">
            <button
              className=" py-2 px-10 text-totem-pole-100 rounded-md bg-totem-pole-400"
              onClick={() => setShowBookingMobile(true)}
            >
              Book
            </button>
          </div>
          {
            data && !isLoading &&(
              <div
            className={`lg:sticky lg:top-20 lg:left-0 lg:bottom-0  w-full  shadow-xl rounded-md  lg:flex flex-col gap-y-2 py-2 ${
              showBookingMobile
                ? "  lg:h-fit fixed top-0 backdrop-blur-md bg-white/70 z-10 h-screen flex flex-col justify-center"
                : "hidden"
            }`}
          >
            <div className=" bg-white flex flex-col gap-4 p-2 rounded-md">
              <div
                className="lg:hidden flex items-center justify-end cursor-pointer"
                onClick={() => setShowBookingMobile(false)}
              >
                <Close />
              </div>
              <div className="p-1 rounded-md border border-totem-pole-400">
                <h3>Add date</h3>
                <Datepicker
                  useRange={false}
                  asSingle={true}
                  value={date}
                  onChange={handleDateChange}
                  primaryColor={"orange"}
                  popoverDirection="left"
                />
              </div>
              <div className="relative flex flex-col border border-totem-pole-400 rounded-md p-1 ">
                <div>
                  <h3>Select table</h3>
                  <div
                    className=" flex items-center justify-between py-2 bg-slate-800 rounded-lg px-1 text-gray-400 hover:cursor-pointer"
                    onClick={() => setShowTables(!showTables)}
                  >
                    <span>
                      {selectedTable
                        ? `Table 0${selectedTable.number}`
                        : "Choose table"}
                    </span>
                    {showTables ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </div>
                </div>
                {showTables && (
                  <ul className="absolute top-16 grid grid-cols-2 gap-4 w-full py-2 h-60 overflow-y-scroll rounded-md scroll-m-4 px-3 bg-slate-800 text-white mt-2">
                    {tables.map((table, index) => (
                      <li key={index} className=" w-full h-fit">
                        <button
                          className={`relative w-full py-2 px-3 rounded-md bg-totem-pole-400 flex items-center justify-center gap-x-1 overflow-hidden ${table.occupied && " bg-red-600" }`}
                          disabled = {table.occupied ? true : false}
                          onClick={() => {
                            setTableId(table._id);
                            getSelectedTable(table._id);
                            setShowTables(false);
                          }}
                        ><TableBar/>
                          <span>Table: 0{table.number}</span>
                          {
                            table.occupied && (
                              <span className=" absolute top-0 left-0 w-full h-full text-white flex items-center justify-center backdrop-blur-sm bg-white/20">
                            Occupied
                          </span>
                            )
                          }
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className=" flex gap-1 text-totem-pole-50">
                <button
                  className=" py-2 px-3 rounded-md bg-totem-pole-500 w-full"
                  onClick={BookTable}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
