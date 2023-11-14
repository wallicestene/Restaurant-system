/* eslint-disable react/prop-types */
import { LocationOn } from "@mui/icons-material";
import moment from "moment";
const Bookings = ({ booking }) => {
  return (
    <div className=" p-1 rounded-md overflow-hidden relative shadow-lg backdrop-blur-md">
      <div className=" rounded overflow-hidden">
        <img
          src={booking.restaurantId.images[0]}
          alt=""
          className="h-48 w-48  object-cover"
        />
      </div>
      <h1 className=" absolute top-3 left-3 h-5 backdrop-blur-md bg-totem-pole-600/80  px-1 rounded-sm text-totem-pole-50">{booking?.restaurantId.name}</h1>
      <div className=" absolute top-1/2 left-2 -translate-y-1/2  backdrop-blur bg-totem-pole-200/80 rounded-md py-1 px-2 text-xs text-slate-900">
        <p>Table 0{booking?.tableId.number}</p>
        <p>Table Capacity: {booking?.tableId.capacity}</p>
        <p>Date: {moment(booking?.date).format("YYYY-MM-DD")}</p>
      </div>
      <p className=" absolute bottom-3 left-3 flex items-center backdrop-blur-md bg-gray-200/80 px-1 rounded-sm text-xs text-slate-900">
        <LocationOn
          sx={{
            fontSize: "0.9rem",
          }}
        />
        <span>{booking?.restaurantId.address}</span>
      </p>
    </div>
  );
};

export default Bookings;
