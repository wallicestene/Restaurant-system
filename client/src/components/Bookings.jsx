/* eslint-disable react/prop-types */
import { LocationOn } from "@mui/icons-material";
import moment from "moment";
const Bookings = ({ booking }) => {
  return (
    <div className=" flex gap-x-2 bg-white w-full rounded-md overflow-hidden  ">
      <div className="leftDiv h-28 w-40  overflow-hidden ">
        <img
          src={booking?.restaurantId.images[0]}
          alt={booking?.restaurantId.name}
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="rightDiv flex flex-col justify-between py-3">
        <h1>{booking?.restaurantId.name}</h1>
        <div className=" flex gap-x-2">
        <p>Table 0{booking?.tableId.number}</p>
        <p>Table for {booking?.tableId.capacity}</p>
        <p>{moment(booking?.date).format("YYYY-MM-DD")}</p>
        </div>
        <p>{booking?.restaurantId.address}</p>
      </div>
    </div>
  );
};

export default Bookings;
