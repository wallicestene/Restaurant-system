import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/Usercontext";
import Bookings from "../components/Bookings";
import { useNavigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import BeatLoader from "react-spinners/BeatLoader";
import { Alert } from "@mui/material";
import useServer from "../hooks/ServerUrl";
// eslint-disable-next-line react/prop-types
const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    const getMyBookings = () => {
      fetch(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        `${useServer()}api/reservations/?userId=${user?.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          } else {
            return response.json();
          }
        })
        .then((bookings) => {
          setMyBookings(bookings);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };
    getMyBookings();
  }, [user?.token, user?.userId]);
  return (
    <>
      <div className="lg:w-11/12  mx-auto w-full py-20 px-2 font-Mulish ">
        <AccountNav />
        {error && (
          <div className="w-full h-48 flex items-center justify-center">
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <BeatLoader color="#ff7a00" size={20} speedMultiplier={0.8} />
          </div>
        )}
        {!loading && !error && (
          <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-24 p-2 lg:place-items-start place-items-center">
            {myBookings.map((booking) => (
              <Bookings key={booking?._id} booking={booking} />
            ))}
          </div>
        )}
        {!loading && myBookings.length == 0 && !error && (
          <div className=" flex flex-col gap-y-1">
            <h1 className=" text-xl font-semibold">No Bookings...Yet</h1>
            <p className=" text-base">
              You {"don't"} have bookings yet. Click the button below to make a
              new one.
            </p>
            {/* <button  className=" py-2 px-3 border border-totem-pole-400 rounded w-fit">Start searching</button> */}
            <button
              onClick={() => {
                navigate("/");
              }}
              className="relative w-fit inline-block px-4 py-2 font-medium group"
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-base text-black group-hover:text-white">
                Start Searching
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
