/* eslint-disable no-unused-vars */
import {
  EditCalendar,
  LocationOn,
  Person,
  Search,
  TableBar,
  TableRestaurant,
} from "@mui/icons-material";
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const Filter = ({searchInput, setSearchInput, searchRestaurant}) => {
  return (
    <section className="p-2">
      <div className=" font-mulish mt-20">
        <form className=" flex items-center justify-center gap-3">
          <div className="  border-[1px] border-gray-300 shadow-lg h-12 rounded-full lg:w-96 w-9/12 flex items-center gap-1 overflow-hidden px-1 ">
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-full w-full outline-none border-none bg-none placeholder:text-gray-500"
            />
          </div>

          <button className=" p-3 bg-totem-pole-500 rounded-full text-orange-50 text-sm hover:bg-totem-pole-600 transition-all delay-100 duration-150 hover:transform hover:scale-105 ease-linear" onClick={searchRestaurant}>
            <Search/>
          </button>
        </form>
      </div>
    </section>
  );
}

export default Filter;
