/* eslint-disable react/prop-types */
import { DateRange, LocationOn } from "@mui/icons-material";
import moment from "moment";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import { toast } from "sonner";
import { Button } from "@mui/material";
const Bookings = ({ booking }) => {
  const [{ user }] = useUserContext();
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

  const startDate = moment(booking?.checkIn)
  const endDate = moment(booking?.checkOut)
  const duration = moment.duration(endDate.diff(startDate));
  return (
    <>
      <div>
        <div className=" h-64 overflow-hidden rounded-xl border border-black inline-block">
          <img
            src={`http://localhost:3000/uploads/${booking?.restaurantId.images[0]}`}
            alt={`${booking?.restaurantId.name} image 1 `}
            className=" h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            {booking?.restaurantId.name}
          </h2>
          <p className="flex items-center space-x-1 text-sm">
            <LocationOn/>
            <span>{booking?.restaurantId.address}</span>
          </p>
          <p className=" flex gap-2 text-base font-medium text-">
            <span>
           {duration.asDays() - 1} Night{duration.asDays() == 1 ? "" : "s"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bookings;
