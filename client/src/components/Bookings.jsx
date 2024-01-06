/* eslint-disable react/prop-types */
import {
  DateRange,
  Delete,
  LocationOn,
  Numbers,
  TableBarOutlined,
} from "@mui/icons-material";
import moment from "moment";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import { toast } from "sonner";
const Bookings = ({ booking }) => {
  const [{ user }] = useUserContext();
  const history = useNavigate()
  const deleteBooking = () => {
    fetch(`http://localhost:3000/api/restaurant/reservation/${booking._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("Reservation Deleted successfully");
        }
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" flex gap-x-2 bg-gray-200/90 w-full rounded-md overflow-hidden shadow-lg text-slate-900">
      <div className="leftDiv h-28 w-1/2  overflow-hidden ">
        <img
          src={`http://localhost:3000/uploads/${booking?.restaurantId.images[0]}`}
          alt={booking?.restaurantId.name}
          className=" h-full w-full object-cover"
        />
      </div>
      <div className="rightDiv relative flex flex-col justify-between py-3 w-full">
        <Link to={`/restaurant/${booking?.restaurantId._id}`}>
          <h1 className=" text-base">{booking?.restaurantId.name}</h1>
        </Link>
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
        </p><div>
        <button className=" absolute top-1 right-1 rounded-md bg-red-500 px-2 text-white" onClick={deleteBooking
          }>
          Delete
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default Bookings;
