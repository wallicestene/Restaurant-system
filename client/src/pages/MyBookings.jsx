import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/Usercontext";
import Bookings from "../components/Bookings";
import { useNavigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { CircularProgress } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    const getMyBookings = () => {
      fetch(`http://localhost:3000/api/reservations/?userId=${user?.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
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
      <div className="lg:w-11/12 mx-auto w-full py-20 px-2 font-Montserrat">
        <AccountNav/>
        <div className=" flex flex-col gap-y-3">
          {loading &&(
            <div className="flex justify-center items-center h-48">
              <CircularProgress/>
            </div>
            )}
        </div>
        {error && <p>{error}</p>}
        {!loading &&!error && myBookings.length > 0 ? (
          <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center gap-4 p-2">
            {myBookings.map((booking) => (
              <Bookings key={booking?._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className=" flex flex-col gap-y-1">
            <h1 className=" lg:text-2xl md:text-xl text-lg font-bold">No Bookings...Yet</h1>
            <p>
              You {"don't"} have bookings yet. Click the button below to make a new
              one.
            </p>
            <button onClick={() => {
              navigate("/")
            }} className=" py-2 px-3 border border-totem-pole-400 rounded w-fit">Start searching</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
