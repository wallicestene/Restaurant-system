import {
  FormatListBulleted,
  PersonOutline,
  RestaurantMenu,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const AccountNav = () => {
    const {pathname} = useLocation();
    let subPage = pathname.split('/')?.[2];
  const addStyles = (pageTitle = null) => {
    let styles = " px-2 h-12  cursor-pointer flex items-center gap-x-1";
    if (
      pageTitle === subPage ||
      (subPage === undefined && pageTitle === "myProfile")
    ) {
      styles += " bg-totem-pole-500 rounded-full text-totem-pole-50";
    }
    return styles;
  };
  return (
    <>
      <nav className=" flex flex-col items-center my-5 sticky top-24 z-10 font-Montserrat">
        <ul className="bg-gray-200/90 h-12 px-1 rounded flex items-center justify-center gap-10 w-fit text-sm">
          <li>
            <Link className={addStyles("myProfile")} to="/account">
              <PersonOutline fontSize="small" />
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link className={addStyles("myBookings")} to="/account/myBookings">
              <FormatListBulleted fontSize="small" />
              <span>My Bookings</span>
            </Link>
          </li>
          <li>
            <Link
              className={addStyles("myListings")}
              to="/account/myListings"
            >
              <RestaurantMenu fontSize="small" />
              <span>My Listings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AccountNav;
