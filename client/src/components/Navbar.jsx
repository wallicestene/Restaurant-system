import { Close, Menu } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    const navShow = () => {
      if (window.scrollY > 100) {
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
      className={`fixed z-10 bg-white flex items-center justify-between py-1 font-mulish w-full -2 ${
        showNavbar &&
        "backdrop-blur-xl  bg-totem-pole-200/70 shadow transition-colors duration-300 delay-150"
      }`}
    >
      <div className="left text-lg font-bold  ">DineEasy</div>
      {showNavMobile && (
        <div className="lg:hidden md:hidden fixed z-20 bg-totem-pole-700 text-totem-pole-50 top-12 right-0 h-screen w-2/5">
          <NavbarMobile />
        </div>
      )}
      <div className="center hidden md:flex lg:flex lg:flex-row">
        <nav>
          <ul className="flex justify-between gap-10 ">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Hotels</a>
            </li>
            <li>
              <a href="/">Hotels</a>
            </li>
            <li>
              <a href="/">Hotels</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right flex gap-2 items-center justify-between lg:border md:border border-totem-pole-400 rounded-full ">
        <span className=" hidden lg:flex md:flex pl-3 text-totem-pole-600">
          Wallace
        </span>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src="data:image/jpeg;base64,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"
        />
        <div
          className="lg:hidden md:hidden pr-1 hover:cursor-pointer"
          onClick={() => setShowNavMobile(!showNavMobile)}
        >
          {showNavMobile ? (
            <Close fontSize="large" />
          ) : (
            <Menu fontSize="large" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
