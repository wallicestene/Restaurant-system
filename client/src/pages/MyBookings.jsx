import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/Usercontext";
import Bookings from "../components/Bookings";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";

// eslint-disable-next-line react/prop-types
const MyBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useUserContext();
  const skeleton = [1, 2, 3, 4,];
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
      <div className="w-1/2 mx-auto py-20 font-mulish">
        <AccountNav/>
        <div className=" flex flex-col gap-y-3">
          {loading &&
            skeleton.map((skeleton, index) => (
              <div key={index} className=" bg-gray-200/90 rounded">
                <div className=" flex gap-3">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="50%"
                    height={120}
                    sx={{
                      bgcolor: "grey.500",
                    }}
                  />
                  <div className=" w-full flex flex-col justify-between py-3 ">
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width="80%"
                      height={22}
                      sx={{
                        bgcolor: "grey.500",
                      }}
                    />
                    <div className=" flex justify-around gap-x-2 px-2">
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="50%"
                        height={22}
                        sx={{
                          bgcolor: "grey.500",
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="50%"
                        height={22}
                        sx={{
                          bgcolor: "grey.500",
                        }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="50%"
                        height={22}
                        sx={{
                          bgcolor: "grey.500",
                        }}
                      />
                    </div>
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width="50%"
                      height={22}
                      sx={{
                        bgcolor: "grey.500",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
        {error && <p>{error}</p>}
        {!loading &&!error && myBookings.length > 0 ? (
          <div className=" flex flex-col gap-y-3">
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
