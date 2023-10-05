import { EditCalendar, LocationOn, Person, TableBar } from "@mui/icons-material";
import React from "react";

function Filter() {
  return (
    <section className="p-2">
      <div className=" my-5 font-mulish">
        <form className=" flex items-center justify-center gap-3">
          <div className="  border border-totem-pole-500 h-10 rounded-full lg:w-96 w-9/12 flex items-center gap-1 overflow-hidden px-1">
            <LocationOn />
            <input
              type="text"
              placeholder="Search by location"
              className="indent-1 h-full w-full outline-none border-none"
            />
          </div>

          <button className="lg:px-3 px-2 py-2 bg-totem-pole-500 rounded-lg text-orange-50 text-sm">Find Hotel</button>
        </form>
      </div>
      <div className=" flex items-center flex-wrap lg:gap-5 md:gap-5 gap-2 font-Montserrat lg:justify-normal md:justify-normal justify-center">
        <h1>Filter your search:</h1>
        <div className=" flex items-center justify-center flex-wrap lg:gap-10 md:gap-10 gap-2">
            <div className="flex items-center gap-2 border border-totem-pole-300 rounded-full lg:pr-5 md:pr-5 pr-2">
                <span className=" bg-totem-pole-300  rounded-full h-10 w-10 flex items-center justify-center"><EditCalendar/></span>
                {/* <input type="month" /> */}
                <p>Sat,Nov 10-fri</p>
            </div>
            <div className="flex items-center gap-2 border border-totem-pole-300 rounded-full lg:pr-5 md:pr-5 pr-2">
                <span className=" bg-totem-pole-300 rounded-full h-10 w-10 flex items-center justify-center"><TableBar/></span>
                <p>Table- 2</p>
            </div>
            <div className="flex items-center gap-2 border border-totem-pole-300 rounded-full lg:pr-5 md:pr-5 pr-2">
                <span className=" bg-totem-pole-300 rounded-full h-10 w-10 flex items-center justify-center"><Person/></span>
                <p>Guests</p>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;
