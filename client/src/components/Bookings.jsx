/* eslint-disable react/prop-types */
import {
  DateRange,
  LocationOn,
  Numbers,
  TableBarOutlined,
} from "@mui/icons-material";
import moment from "moment";
const Bookings = ({ booking }) => {
  return (
    <div className=" flex gap-x-2 bg-gray-200/90 w-full rounded-md overflow-hidden shadow-lg text-slate-900">
      <div className="leftDiv h-28 w-1/2  overflow-hidden ">
        <img
          src={`http://localhost:3000/uploads/${booking?.restaurantId.images[0]}`}
          alt={booking?.restaurantId.name}
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="rightDiv flex flex-col justify-between py-3 w-full">
        <h1 className=" text-base">{booking?.restaurantId.name}</h1>
        <div className=" flex gap-x-2 justify-around ">
          <p className=" flex items-center gap-x-1 bg-slate-900 px-2 py-1 text-totem-pole-50 rounded">
            <TableBarOutlined fontSize="small" />{" "}
            <span> Table 0{booking?.tableId.number}</span>
          </p>
          <p className=" flex items-center gap-x-1 bg-slate-900 px-2 py-1 text-totem-pole-50 rounded">
            <Numbers fontSize="small" /> Table for {booking?.tableId.capacity}
          </p>
          <p className=" flex items-center gap-x-1 bg-slate-900 px-2 py-1 text-totem-pole-50 rounded">
            {" "}
            <DateRange fontSize="small" />{" "}
            {moment(booking?.date).format("YYYY-MM-DD")}
          </p>
        </div>
        <p className=" flex items-center text-xs">
          <LocationOn
            sx={{
              fontSize: "1.0rem",
            }}
          />
          {booking?.restaurantId.address}
        </p>
      </div>
    </div>
  );
};

export default Bookings;
