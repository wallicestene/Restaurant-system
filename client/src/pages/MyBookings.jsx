import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/Usercontext";
import Bookings from "../components/Bookings";
import { Skeleton } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MyBookings = ({ subPage }) => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useUserContext();
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    if (user && subPage === "myBookings") {
      getMyBookings();
    }
  }, [subPage, user, user?.token, user?.userId]);
  return (
    <>
      <div className=" lg:w-1/2 w-full">
        <div className=" flex flex-col gap-y-2">
          {loading &&
            skeleton.map((skeleton, index) => (
              <div key={index} className=" bg-gray-200/90 rounded">
                <div className=" flex gap-2">
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
        {!loading && myBookings.length > 0 && (
          <div className=" flex flex-col gap-y-2 ">
            {myBookings.map((booking) => (
              <Bookings key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
