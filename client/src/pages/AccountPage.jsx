/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import {
  Add,
  FormatListBulleted,
  PersonOutline,
  RestaurantMenu,
} from "@mui/icons-material";
import Profile from "./Profile";
import MyBookings from "./MyBookings";
import MyRestaurants from "./MyRestaurants";

const AccountPage = () => {
  const [{ user }, dispatch] = useUserContext();
  const { subPage } = useParams();
  const addStyles = (pageTitle = null) => {
    let styles = " py-1 px-2 cursor-pointer flex item-center gap-x-1";
    if (
      pageTitle === subPage ||
      (subPage === undefined && pageTitle === "myProfile")
    ) {
      styles += " bg-totem-pole-500 rounded-full text-totem-pole-50";
    }
    return styles;
  };
  return (
    <div className=" pt-16 font-mulish">
      {/* {
        // if the user is not logged in redirect to login page
        !user ? (
          <Navigate replace to="/" />
        ) : ( */}
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
                <FormatListBulleted fontSize="small" />
                <span>My Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                className={addStyles("myFavorites")}
                to="/account/myFavorites"
              >
                <RestaurantMenu fontSize="small" />
                <span>My Restaurants</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className=" grid place-items-center gap-y-1 items-center text-sm py-2 px-4">
          {subPage === undefined && <Profile />}
          {subPage === "myBookings" && <MyBookings subPage={subPage} />}
          {subPage === "myFavorites" && <MyRestaurants />}
        </div>
      </>
      {/* )
      } */}
    </div>
  );
};

export default AccountPage;
