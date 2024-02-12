import {
  FormatListBulletedOutlined,
  HomeOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
const AccountNav = () => {
  const { pathname } = useLocation();
  let subPage = pathname.split("/")?.[2];
  const addStyles = (pageTitle = null) => {
    let styles =
      " px-1 h-12  cursor-pointer flex items-center gap-x-1 text-base ";
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
      <nav className=" flex flex-col w-full items-center my-5 sticky top-24 z-20 font-Mulish">
        <ul className="bg-gray-200/90 h-12  rounded flex items-center lg:justify-center md:justify-center md:gap-8 lg:gap-10 lg:w-fit justify-between w-full text-sm">
          <li>
            <Link className={addStyles("myProfile")} to="/account">
              <span className=" h-9 w-9 grid place-items-center bg-slate-900 rounded-full text-totem-pole-500">
                <PersonOutline />
              </span>
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link className={addStyles("myBookings")} to="/account/myBookings">
              <span className=" h-9 w-9 grid place-items-center bg-slate-900 rounded-full text-totem-pole-500">
                <FormatListBulletedOutlined />
              </span>
              <span>My Bookings</span>
            </Link>
          </li>
          <li>
            <Link className={addStyles("myListings")} to="/account/myListings">
              <span className=" h-9 w-9 grid place-items-center bg-slate-900 rounded-full text-totem-pole-500">
                <HomeOutlined />
              </span>

              <span>My Listings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AccountNav;
