/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  AcUnitRounded,
  Deck,
  FireExtinguisherOutlined,
  Fireplace,
  HotTub,
  Kitchen,
  LocalLaundryServiceOutlined,
  MedicalServicesOutlined,
  OutdoorGrill,
  PaidOutlined,
  Pool,
  TimeToLeave,
  Tv,
  Wifi,
  Work,
} from "@mui/icons-material";
import {
  Add,
  BedOutlined,
  Circle,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardBackspace,
  LocationOn,
  Remove,
} from "@mui/icons-material";
import Datepicker from "react-tailwindcss-datepicker";
import { Alert, CircularProgress } from "@mui/material";
import { useUserContext } from "../hooks/Usercontext";
import { toast } from "sonner";
import { getUnit } from "@mui/material/styles/cssUtils";
import Scroll from "../components/SmoothScroll";
import BookingPage from "../components/BookingPage";
import BeatLoader from "react-spinners/BeatLoader";
import useServer from "../hooks/ServerUrl";
const RestaurantDetailsPage = () => {
  const [value, setValue] = useState(0);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [loading, setLoading] = useState(true);
  const [showBookingMobile, setShowBookingMobile] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [allAmenities, setAllAmenities] = useState(8);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [allGuests, setAllGuests] = useState(adults);
  const [disableGuests, setDisableGuests] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [{ user }] = useUserContext();

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `${useServer()}api/restaurant/${id}`
  );
  useEffect(() => {
    const numberOfGuests = () => {
      const guestsNumber = adults + children;
      setAllGuests(guestsNumber >= data.guests ? data?.guests : guestsNumber);
      if (data.guests <= guestsNumber) {
        setDisableGuests(true);
      } else {
        setDisableGuests(false);
      }
    };
    numberOfGuests();
  }, [adults, allGuests, children, data.guests]);

  const handleBooking = () => {
    if (user && date.startDate && date.endDate) {
      fetch(`${useServer()}api/restaurant/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          userId: user?.userId,
          restaurantId: data._id,
          checkIn: date.startDate,
          checkOut: date.endDate,
          guests: {
            adults,
            children,
            infants,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            setBookingError(result.error);
            toast.error(result.error);
          } else {
            const promise = () =>
              new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: "Loading...",
              success: "Reservation Successful!",
              error: "Error",
            });
            setTimeout(navigate("/account/myBookings"), 2000);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      toast.error("Please select check in and check out to book!");
    }
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const showAllAmenities = (amenitiesArray) => {
    setAllAmenities((preAmenities) => {
      return preAmenities == amenitiesArray.length ? 8 : amenitiesArray.length;
    });
  };
  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen flex items-center justify-center">
          <BeatLoader color="#ff7a00" size={20} speedMultiplier={0.8} />
        </div>
      )}
      {error && (
        <div className="w-screen h-screen flex items-center justify-center">
          {" "}
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {!isLoading && !error && (
        <div className=" py-16 lg:w-11/12 md:w-11/12 w-full mx-auto font-Mulish relative">
          <div className="px-2">
            <button
              className=" flex items-center justify-between text-base hover:bg-totem-pole-100 w-fit p-1 rounded-md transition-colors delay-150 duration-300"
              onClick={() => navigate(-1)}
            >
              <span>
                <KeyboardBackspace
                  sx={{
                    fontSize: "1.3rem",
                  }}
                />
              </span>
              <span className=" text-[1rem]">Back</span>
            </button>
          </div>
          <div className=" relative mx-auto lg:px-3 md:px-3 ">
            <div>
              <div className="px-2 font-semibold my-2 text-lg  first-letter:uppercase ">
                <h1>{data?.name}</h1>
              </div>
            </div>
            <div
              className={`top hidden lg:grid gap-2 h-80 overflow-hidden rounded-xl ${
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
                  className=" h-full w-full object-cover object-center"
                  alt=""
                />
              </div>
              <div
                className={`imgright grid gap-2 h-80 w-full overflow-hidden ${
                  data.images.slice(1).length <= 2 && " grid-cols-1"
                }
              ${data.images.slice(1).length >= 3 && "grid-cols-2"}
              `}
              >
                {data?.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="overflow-hidden">
                    <img
                      src={image}
                      alt={data?.name}
                      className="h-40 w-full  object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
            {data?.images.length > 5 && (
              <div>
                <Link
                  to={`/imageGallery/${id}`}
                  className=" hidden absolute bottom-2 right-4 bg-white/70 backdrop-blur-md text-xs  lg:flex items-center font-semibold gap-1 py-1 px-2 rounded-md hover:cursor-pointer"
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
                  showStatus={false}
                  autoPlay
                  preventMovementUntilSwipeScrollTolerance
                  swipeScrollTolerance={10}
                  emulateTouch
                  transitionTime={650}
                  infiniteLoop
                  stopOnHover
                  interval={5000}
                  showArrows={false}
                  useKeyboardArrows={true}
                  className=" relative lg:hidden w-full overflow-hidden"
                >
                  {data?.images.map((image, index) => (
                    <div key={index} className="  overflow-hidden h-80 w-full">
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

          <div className=" grid lg:grid-cols-3 grid-cols-1 relative gap-x-2 py-2">
            <div className=" lg:col-span-2 p-2">
              {data && !isLoading && (
                <div className="flex items-center gap-x-2 ">
                  <p className="text-sm  font-semibold flex items-center">
                    <LocationOn
                      sx={{
                        fontSize: "1.4rem",
                      }}
                    />
                    <span className=" ">{data?.address}</span>
                  </p>
                  <div className=" flex items-center gap-x-2 text-sm font-extralight">
                    <p className=" flex items-center justify-center gap-x-[2px]">
                      <Circle
                        sx={{
                          height: "0.12em",
                          width: "0.12em",
                        }}
                      />{" "}
                      {data?.guests} Guest(s)
                    </p>
                    <p className=" flex items-center justify-center gap-x-[2px]">
                      <Circle
                        sx={{
                          height: "0.12em",
                          width: "0.12em",
                        }}
                      />{" "}
                      {data?.whereToSleep.length} Bedroom(s)
                    </p>
                  </div>
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
                  <h2 className=" my-2 text-lg font-semibold ">
                    About this place
                  </h2>
                  <p className="text-md text-gray-900 text-sm  line-clamp-[4]">
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
              {data && !isLoading && data?.amenities.length > 0 && (
                <div className=" px-2">
                  <h2 className=" my-2 text-lg font-semibold ">
                    Amenities in this place
                  </h2>
                  <ul className=" grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3">
                    {data.amenities
                      .slice(0, allAmenities)
                      .map((amenity, index) => (
                        <li
                          className="first-letter:uppercase p-2 flex w-full items-center gap-x-1 rounded-md"
                          key={index}
                        >
                          <div>
                            {(amenity === "Wifi" && <Wifi />) ||
                              (amenity === "Outdoor dining" && <Deck />) ||
                              (amenity === "TV" && <Tv />) ||
                              (amenity === "Kitchen" && <Kitchen />) ||
                              (amenity === "Washer" && (
                                <LocalLaundryServiceOutlined />
                              )) ||
                              (amenity === "Free parking" && <TimeToLeave />) ||
                              (amenity === "Paid parking" && (
                                <PaidOutlined />
                              )) ||
                              (amenity === "Air conditioning" && (
                                <AcUnitRounded />
                              )) ||
                              (amenity === "Workspace" && <Work />) ||
                              (amenity === "Hot tub" && <HotTub />) ||
                              (amenity === "Pool" && <Pool />) ||
                              (amenity === "Outdoor grill" && (
                                <OutdoorGrill />
                              )) ||
                              (amenity === "Fire place" && <Fireplace />) ||
                              (amenity === "Fire extinguisher" && (
                                <FireExtinguisherOutlined />
                              )) ||
                              (amenity === "First aid kit" && (
                                <MedicalServicesOutlined />
                              )) ||
                              (amenity === "Smoke detector" && (
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVR4nGNgGAUkgP9UxgNnAT6x/wT4uMTwS5AIcJrzFCphxUA+sIaa8QSbZDsVw78VmwVsUEtgPiEHP4EaDjILL1gO1ZBBRLBkQNWC9BANSNG0nATHwIEGGcGjwUAiICUunjMwMDAyjEjwn4yiYtQCBqoGETqguoEM9LZg8AEAeEuZ96V4tvUAAAAASUVORK5CYII="></img>
                              ))}
                          </div>
                          <p>{amenity}</p>
                        </li>
                      ))}{" "}
                  </ul>
                  {data.amenities.length > 3 && (
                    <button
                      onClick={() => showAllAmenities(data.amenities)}
                      className=" mt-3 py-2 px-3 border border-black rounded-md hover:bg-gray-100 hover:transition-colors duration-150 delay-75"
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
              {data && !isLoading && data?.whereToSleep.length > 0 && (
                <div className=" px-2">
                  <h2 className=" my-2 text-lg font-semibold ">
                    Where to sleep
                  </h2>
                  <div className=" grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-2">
                    {data.whereToSleep.map((place, index) => (
                      <div
                        key={index}
                        className=" border border-black py-4 px-3 rounded-md flex flex-col gap-y-2"
                      >
                        <BedOutlined />
                        <div>
                          <p>Bedroom {place?.bedroom}</p>
                          {place?.sleepingPosition?.kingBed > 0 && (
                            <p className=" mt-[1.7px] text-[0.8em] text-gray-600">
                              {place?.sleepingPosition?.kingBed} King bed
                              {`${
                                place?.sleepingPosition?.kingBed > 1 ? "s" : ""
                              }`}
                            </p>
                          )}
                          {place?.sleepingPosition?.queenBedBed > 0 && (
                            <p className=" mt-[1.7px] text-[0.8em] text-gray-600">
                              {place?.sleepingPosition?.queenBed} Queen bed
                              {`${
                                place?.sleepingPosition?.queenBed > 1 ? "s" : ""
                              }`}
                            </p>
                          )}
                          {place?.sleepingPosition?.singleBed > 0 && (
                            <p className=" mt-[1.7px] text-[0.8em] text-gray-600">
                              {place?.sleepingPosition?.singleBed} Single bed
                              {`${
                                place?.sleepingPosition?.singleBed > 1
                                  ? "s"
                                  : ""
                              }`}
                            </p>
                          )}
                          {place?.sleepingPosition?.sofa > 0 && (
                            <p className=" mt-[1.7px] text-[0.8em] text-gray-600">
                              {place?.sleepingPosition?.sofa} Sofa
                              {`${
                                place?.sleepingPosition?.sofa > 1 ? "s" : ""
                              }`}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className=" lg:col-span-1 flex flex-col items-center">
              <div className="lg:hidden fixed bottom-[40px] right-4 flex justify-end items-end w-full">
                <button
                  className=" py-2 inline-flex items-center justify-center h-12 px-6 font-medium  text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                  onClick={() => setShowBookingMobile(true)}
                >
                  Book
                </button>
              </div>
              {data && !isLoading && (
                <div
                  className={`lg:sticky lg:top-20 lg:left-0 lg:bottom-0  w-full  shadow-2xl rounded-md  lg:flex flex-col gap-y-2  font-mulish ${
                    showBookingMobile
                      ? "  lg:h-fit fixed top-0 z-10 backdrop-blur-md bg-white/70 h-screen flex flex-col justify-center"
                      : "hidden"
                  }`}
                >
                  <div className=" bg-white flex flex-col gap-4 p-3 rounded-md border">
                    <div className=" flex w-full justify-between">
                      <div>
                        <p className=" ">
                          <span className="text-[1.2em] font-semibold ">
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
                    <div className="rounded-lg border border-totem-pole-400 flex flex-col gap-2 p-2">
                      <div>
                        <h3>
                          Add <strong>check in</strong> and{" "}
                          <strong>check out</strong>
                        </h3>
                        <Datepicker
                          inputClassName={
                            "placeholder:text-sm border-none outline-none font-extralight"
                          }
                          containerClassName={
                            "relative h-14 border border-black flex items-center rounded-lg"
                          }
                          useRange={true}
                          value={date}
                          readOnly={true}
                          separator={"to"}
                          minDate={new Date()}
                          onChange={handleDateChange}
                          primaryColor={"orange"}
                          popoverDirection="left"
                        />
                      </div>

                      <div className="relative flex flex-col ">
                        <div>
                          <h3>Guests</h3>
                          <div
                            className=" flex items-center justify-between py-2 h-14 rounded-lg border border-black px-2 hover:cursor-pointer"
                            onClick={() => setShowGuests(!showGuests)}
                          >
                            <div className=" font-extralight">
                              {allGuests >= 1 && (
                                <span>{`${allGuests} ${
                                  allGuests !== 1 ? "guests" : "guest"
                                }`}</span>
                              )}
                              {infants >= 1 && (
                                <span>{`, ${infants} ${
                                  infants !== 1 ? "infants" : "infant"
                                }`}</span>
                              )}
                            </div>
                            {showGuests ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </div>
                        </div>
                        {showGuests && (
                          <div
                            className={`absolute top-[80px] bg-white shadow-xl border w-full px-2 py-3 flex flex-col gap-5 rounded-md`}
                          >
                            <div className=" flex items-center justify-between">
                              <div>
                                <p>Adult</p>
                                <span className=" font-extralight text-sm">
                                  Age 15+
                                </span>
                              </div>
                              <div className=" flex flex-row-reverse items-center gap-3">
                                <button
                                  disabled={disableGuests}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    disableGuests &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() =>
                                    setAdults((prevValue) =>
                                      allGuests >= data.guests
                                        ? data.guests
                                        : prevValue + 1
                                    )
                                  }
                                >
                                  <Add
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>

                                {adults}
                                <button
                                  disabled={adults == 1}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    adults == 1 &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() => {
                                    setAdults((prevValue) => {
                                      return prevValue <= 1 ? 1 : prevValue - 1;
                                    });
                                  }}
                                >
                                  <Remove
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>
                              </div>
                            </div>
                            <div className=" flex  items-center justify-between">
                              <div>
                                <p>Children</p>
                                <span className=" font-extralight text-sm">
                                  Ages 2–14
                                </span>
                              </div>
                              <div className=" flex flex-row-reverse items-center gap-3">
                                <button
                                  disabled={disableGuests}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    disableGuests &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() =>
                                    setChildren((prevValue) =>
                                      allGuests >= data.guests
                                        ? data.guests
                                        : prevValue + 1
                                    )
                                  }
                                >
                                  <Add
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>

                                {children}
                                <button
                                  disabled={children == 0}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    children == 0 &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() =>
                                    setChildren((prevValue) => {
                                      return prevValue <= 0 ? 0 : prevValue - 1;
                                    })
                                  }
                                >
                                  <Remove
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>
                              </div>
                            </div>
                            <div className=" flex items-center justify-between">
                              <div>
                                <p>Infant</p>
                                <span className=" text-sm font-extralight">
                                  Under 2
                                </span>
                              </div>
                              <div className=" flex flex-row-reverse items-center gap-3">
                                <button
                                  disabled={infants === 2}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    infants === 2 &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() =>
                                    setInfants((prevValue) =>
                                      infants >= 2 ? 2 : prevValue + 1
                                    )
                                  }
                                >
                                  <Add
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>

                                {infants}
                                <button
                                  disabled={infants === 0}
                                  className={`border border-black rounded-full flex items-center justify-center h-7 w-7 hover:bg-gray-100 transition-colors duration-150 delay-75 ${
                                    infants === 0 &&
                                    " text-gray-300 border-gray-300"
                                  }`}
                                  onClick={() =>
                                    setInfants((prevValue) => {
                                      return prevValue <= 0 ? 0 : prevValue - 1;
                                    })
                                  }
                                >
                                  <Remove
                                    sx={{ height: "1.2rem", width: "1.2rem" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className=" flex gap-1 text-totem-pole-50">
                      <button
                        className="inline-flex w-full items-center justify-center h-12 px-6 font-medium  text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                        onClick={
                          user
                            ? () => {
                                if (date.startDate && date.endDate) {
                                  setShowDetails(true),
                                    window.scrollTo({
                                      top: 300,
                                      behavior: "smooth",
                                    });
                                } else {
                                  toast.error(
                                    "Please select check in and check out to book!"
                                  );
                                }
                              }
                            : () => navigate("/login")
                        }
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {showDetails && (
            <BookingPage
              handleBooking={handleBooking}
              setShowDetails={setShowDetails}
            />
          )}
        </div>
      )}
    </>
  );
};

export default RestaurantDetailsPage;
