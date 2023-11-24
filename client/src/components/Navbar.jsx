/* eslint-disable no-unused-vars */
import { Close, Menu } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";

const Navbar = () => {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [{ user }, dispatch] = useUserContext();
  // console.log(user);
  useEffect(() => {
    const navShow = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener("scroll", navShow);

    return () => window.removeEventListener("scroll", navShow);
  }, []);
  return (
    <div
      className={`fixed z-20 bg-white flex items-center justify-between py-3 font-mulish w-full px-2 ${
        showNavbar &&
        "backdrop-blur-xl  bg-white/60 shadow transition-colors duration-300 delay-150"
      }`}
    >
      <div className="left text-lg font-bold  ">
        <Link to="/">RestoReserve</Link>
      </div>
      {showNavMobile && (
        <div className="lg:hidden md:hidden fixed z-20 bg-totem-pole-700 text-totem-pole-50 top-12 right-0 h-screen w-2/5">
          <NavbarMobile />
        </div>
      )}
      <Link
        to={user ? "/account" : "/login"}
        className="right flex gap-2 items-center justify-between lg:border md:border border-slate-900 border-r-0 rounded-full overflow-hidden "
      >
        {user && (
          <span className=" hidden lg:flex md:flex pl-3 text-slate-900 text-sm first-letter:uppercase">
            {user?.first_name}
          </span>
        )}
        <Avatar sx={{ width: 33, height: 33, backgroundColor: "#0F172A" }}>
          {user?.first_name[0]}
        </Avatar>
      </Link>
    </div>
  );
};

export default Navbar;
