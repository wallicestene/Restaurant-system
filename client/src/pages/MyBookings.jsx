import { useState } from "react";
import { useEffect } from "react";
import { useUserContext } from "../hooks/Usercontext";
import Bookings from "../components/Bookings";

// eslint-disable-next-line react/prop-types
const MyBookings = ({ subPage }) => {
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [{ user }] = useUserContext();
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
        {loading && <p>Loading...</p>}
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
