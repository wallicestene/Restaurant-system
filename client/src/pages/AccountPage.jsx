/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import Restaurant from "../components/Restaurant";
import Bookings from "../components/Bookings";
import {
  FavoriteBorder,
  ListOutlined,
  PersonOutline,
} from "@mui/icons-material";

const AccountPage = () => {
  const [{ user }, dispatch] = useUserContext();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { subPage } = useParams();
  const addStyles = (pageTitle = null) => {
    let styles = " py-1 px-2 cursor-pointer flex item-center gap-x-1";
    if (
      pageTitle === subPage ||
      (subPage === undefined && pageTitle === "myProfile")
    ) {
      styles += " bg-totem-pole-500 rounded-full text-white";
    }
    return styles;
  };
  const LogOutUser = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT_USER",
    });
  };
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
    <div className=" pt-16 font-mulish bg-[url('.\assets\loginFormImages\restaurant2.png')]  bg-cover bg-center h-screen">
      {
        // if the user is not logged in redirect to login page
        !user ? (
          <Navigate replace to="/login" />
        ) : (
          <>
            <nav className=" flex flex-col items-center my-5">
              <ul className="bg-gray-200/90 px-1 h-10 rounded flex items-center justify-center gap-10 w-fit text-sm">
                <li>
                  <Link className={addStyles("myProfile")} to="/account">
                    <PersonOutline fontSize="small" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={addStyles("myBookings")}
                    to="/account/myBookings"
                  >
                    <ListOutlined fontSize="small" />
                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={addStyles("myFavorites")}
                    to="/account/myFavorites"
                  >
                    <FavoriteBorder fontSize="small" />
                    <span>My Favorites</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className=" grid place-items-center gap-y-1 items-center text-sm py-2 px-4">
              {subPage === undefined && (
                <div className=" bg-gray-200 bg-opacity-90 py-2 px-4 rounded lg:w-1/2 w-full">
                  <h3 className=" text-center">You're Logged in as:</h3>
                  <div
                    style={{
                      height: "0.01rem",
                    }}
                    className=" bg-black opacity-20"
                  />
                  <div className="flex flex-col gap-1 p-2">
                    <p className=" grid grid-cols-2 gap-x-0 place-items-start">
                      <span className=" text-slate-900">First Name: </span>{" "}
                      <span className=" text-gray-500 text-xs">
                        {user?.first_name}
                      </span>
                    </p>
                    <p className=" grid grid-cols-2 place-items-start">
                      <span className=" text-slate-900 ">Last Name: </span>{" "}
                      <span className=" text-gray-500 text-xs">
                        {user?.last_name}
                      </span>
                    </p>
                    <p className=" grid grid-cols-2 place-items-start">
                      <span className=" text-slate-900">Email: </span>{" "}
                      <span className=" text-gray-500 text-xs">
                        {user?.email}
                      </span>
                    </p>
                    <button
                      className=" bg-red-600 rounded-md py-2 w-full text-white"
                      onClick={LogOutUser}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
              {subPage === "myBookings" && (
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
              )}
              {subPage === "myFavorites" && (
                <div>
                  <h4 className="text-center font-bold">My Favorites</h4>
                </div>
              )}
            </div>
          </>
        )
      }
    </div>
  );
};

export default AccountPage;
