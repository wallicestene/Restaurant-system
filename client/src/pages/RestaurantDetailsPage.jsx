/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GroupIcon from "@mui/icons-material/Group";
import {
  Backspace,
  BedOutlined,
  Close,
  FavoriteBorder,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardBackspace,
  LocationOn,
  PhotoRounded,
  TableBar,
} from "@mui/icons-material";
import Datepicker from "react-tailwindcss-datepicker";
import { Alert, CircularProgress } from "@mui/material";
import { useUserContext } from "../hooks/Usercontext";
import { toast } from "sonner";
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
  const [allAmenities, setAllAmenities] = useState(3);
  const [selectedTable, setSelectedTable] = useState("");
  const [{ user }] = useUserContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurant/${id}`
  );
  // useEffect(() => {
  //   const getTables = () => {
  //     if (data && !isLoading && !error) {
  //       fetch(`http://localhost:3000/api/tables/restaurant/${data._id}`)
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Failed to fetch data");
  //           } else {
  //             return response.json();
  //           }
  //         })
  //         .then((tables) => {
  //           setLoading(false);
  //           // setTables(tables);
  //           setTableError(null);
  //         })
  //         .catch((error) => {
  //           setTableError(error.message);
  //           setLoading(false);
  //         });
  //     }
  //   };
  //   getTables();
  // }, [data, error, isLoading]);
  const getSelectedTable = (id) => {
    setSelectedTable(tables.find((table) => table._id === id));
  };
  // const BookTable = () => {
  //   if (user && date.startDate && tableId) {
  //     fetch("http://localhost:3000/api/restaurant/reservation", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //       body: JSON.stringify({
  //         userId: user?.userId,
  //         restaurantId: data._id,
  //         tableId,
  //         date: date.startDate,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.error) {
  //           setBookingError(result.error);
  //           toast.error(result.error);
  //         } else {
  //           const promise = () =>
  //             new Promise((resolve) => setTimeout(resolve, 2000));
  //           toast.promise(promise, {
  //             loading: "Loading...",
  //             success: "Reservation Successful!",
  //             error: "Error",
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //     setSelectedTable("");
  //   } else {
  //     toast.error("Please select a Table and Date to book!");
  //   }
  // };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const showAllAmenities = (amenitiesArray) => {
    setAllAmenities((preAmenities) => {
      return preAmenities == amenitiesArray.length ? 3 : amenitiesArray.length;
    });
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
        <div className=" relative lg:w-11/12 md:w-11/12 mx-auto px-3">
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
                src={`http://localhost:3000/uploads/${data?.images[0]}`}
                className=" h-full w-full object-cover"
                alt=""
              />
            </div>
            <div
              className={`imgright grid gap-2 h-72 w-full overflow-hidden ${
                data.images.slice(1).length <= 2 && " grid-cols-1"
              }
              ${data.images.slice(1).length >= 3 && "grid-cols-2"}
              `}
            >
              {data?.images.slice(1, 5).map((image, index) => (
                <div key={index} className="overflow-hidden">
                  <img
                    src={`http://localhost:3000/uploads/${image}`}
                    alt={data?.name}
                    className="h-36 w-full  object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {data?.images.length > 5 && (
            <div>
              <Link
                to={`/imageGallery/${id}`}
                className=" hidden absolute bottom-2 right-4 bg-white/70 backdrop-blur-md text-xs tracking-wide lg:flex items-center font-semibold gap-1 py-1 px-2 rounded-md hover:cursor-pointer"
              >
                {/* <PhotoRounded fontSize="small" /> */}
                <img
                  className=" h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQ0lEQVR4nO2TwQkAIAzEMp7S/RdQ91AKnUA4ELlAXznoK/ATASxgAl3gSbHrhsAjf9BrlLIJvHmAcAe4AxPuAHfABQd26G3wlQ9gxwAAAABJRU5ErkJggg=="
                ></img>
                <span>Show all photos</span>
              </Link>
            </div>
          )}
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
                      src={`http://localhost:3000/uploads/${image}`}
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
              <h2 className=" my-2 text-lg font-bold tracking-wide">
                About this place
              </h2>
              <p className="text-md text-gray-900 text-sm tracking-wide line-clamp-[4]">
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
          {data && !isLoading && data?.amenities && (
            <div className=" px-2">
              <h2 className=" my-2 text-lg font-bold tracking-wide">
                Amenities in this place
              </h2>
              <ul className=" grid grid-cols-3 gap-x-3">
                {data.amenities.slice(0, allAmenities).map((amenity, index) => (
                  <li
                    className=" border border-black inline border-opacity-20 my-2 first-letter:uppercase py-1 px-2 rounded-sm"
                    key={index}
                  >
                    {amenity}
                  </li>
                ))}{" "}
              </ul>
              {data.amenities.length > 3 && (
                <button
                  onClick={() => showAllAmenities(data.amenities)}
                  className=" py-2 px-3 border border-black rounded-md hover:bg-gray-100 hover:transition-colors duration-150 delay-75"
                >
                  {allAmenities === data.amenities.length
                    ? "Show less"
                    : `Show all (${data.amenities.length})`}
                </button>
              )}
              <div
                style={{
                  height: "0.01rem",
                }}
                className=" bg-black opacity-20 my-5"
              />{" "}
            </div>
          )}
          <div className=" px-2">
            <h2 className=" my-2 text-lg font-bold tracking-wide">
              Where to sleep
            </h2>
            {data && !isLoading && data?.whereToSleep && (
              <div className=" grid grid-cols-3 ">
                {data.whereToSleep.map((place, index) => (
                  <div
                    key={index}
                    className=" border border-black py-4 px-3 rounded-md flex flex-col gap-y-2"
                  >
                    <BedOutlined />
                    <div>
                      <p>Bedroom {place?.bedroom}</p>
                      <p className=" mt-[1.7px] text-[0.8em] text-gray-600">
                        {place?.sleepingPosition}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                height: "0.01rem",
              }}
              className=" bg-black opacity-20 my-5"
            />
          </div>

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
          {data && !isLoading && (
            <div
              className={`lg:sticky lg:top-20 lg:left-0 lg:bottom-0  w-full  shadow-xl rounded-md  lg:flex flex-col gap-y-2 border font-mulish${
                showBookingMobile
                  ? "  lg:h-fit fixed top-0 backdrop-blur-md bg-white/70 z-10 h-screen flex flex-col justify-center"
                  : "hidden"
              }`}
            >
              <div className=" bg-white flex flex-col gap-4 p-2 rounded-md">
                <div className=" flex w-full justify-between">
                  <div>
                    <p className=" ">
                      <span className="text-[1.2em] font-semibold tracking-wide">
                        {data.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>{" "}
                      <span>per night</span>
                    </p>
                  </div>
                  <div className="lg:hidden flex items-center justify-end">
                    <Close
                      onClick={() => setShowBookingMobile(false)}
                      sx={{
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="p-1 rounded-md border border-totem-pole-400">
                  <h3>Add <strong>check in</strong> and <strong>check out</strong></h3>
                  <Datepicker
                    inputClassName={
                      "placeholder:text-sm bg-slate-800 border-none outline-none text-gray-400"
                    }
                    useRange={true}
                    value={date}
                    minDate={new Date()}
                    onChange={handleDateChange}
                    primaryColor={"orange"}
                    popoverDirection="left"
                  />
                </div>
                <div className="relative flex flex-col border border-totem-pole-400 rounded-md p-1 ">
                  <div>
                    <h3>Select table</h3>
                    <div
                      className=" flex items-center justify-between py-2 bg-slate-800 rounded-lg px-2 text-gray-400 hover:cursor-pointer"
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
                </div>

                <div className=" flex gap-1 text-totem-pole-50">
                  <button
                    className=" py-2 px-3 rounded-md bg-totem-pole-500 w-full"
                    onClick={() => navigate("/login")}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
