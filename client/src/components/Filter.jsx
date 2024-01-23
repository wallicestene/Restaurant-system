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
import Datepicker from "react-tailwindcss-datepicker";

// eslint-disable-next-line react/prop-types
const Filter = ({searchInput, setSearchInput, searchRestaurant}) => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <section className="p-2">
      <div className=" font-mulish mt-20">
        <form className=" flex items-center justify-center gap-3">
          <div className="  border border-totem-pole-500 h-10 rounded-full lg:w-96 w-9/12 flex items-center gap-1 overflow-hidden px-1 ">
            {/* <LocationOn /> */}
            <input
              type="text"
              placeholder="Search restaurant by name or location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-full w-full outline-none border-none bg-none placeholder:text-gray-500"
            />
          </div>

          <button className=" p-2 bg-totem-pole-500 rounded-full text-orange-50 text-sm hover:bg-totem-pole-600 transition-all delay-100 duration-150 hover:transform hover:scale-105" onClick={searchRestaurant}>
            <Search/>
          </button>
        </form>
      </div>
      {/* <div className=" flex items-center flex-wrap lg:gap-5 md:gap-5 gap-2 font-Montserrat justify-center">
        <h1>Filter your search:</h1>
        <div className=" flex items-center justify-center flex-wrap lg:gap-10 md:gap-10 gap-2">
          <div>
            <Datepicker
              containerClassName="relative border border-totem-pole-300 overflow-hidden rounded-full w-full h-10"
              toggleClassName="absolute left-0 rounded-full text-black h-full px-2 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed bg-totem-pole-300"
              inputClassName="bg-transparent h-full indent-10 pl-8 placeholder:text-sm border-none outline-none"
              useRange={false}
              asSingle={true}
              value={date}
              onChange={handleDateChange}
              primaryColor={"orange"}
            />
          </div>
          <div className="flex items-center gap-2 border border-totem-pole-300  rounded-full lg:pr-5 md:pr-5 pr-2">
            <span className=" bg-totem-pole-300 rounded-full h-10 w-10 flex items-center justify-center">
              <TableRestaurant />
            </span>
            <p>Table- 2</p>
          </div>
          <div className="flex items-center gap-2 border border-totem-pole-300 rounded-full lg:pr-5 md:pr-5 pr-2">
            <span className=" bg-totem-pole-300 rounded-full h-10 w-10 flex items-center justify-center">
              <Person />
            </span>
            <p>Guests</p>
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default Filter;
