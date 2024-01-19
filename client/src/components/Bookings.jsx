/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { Circle, LocationOn } from "@mui/icons-material";
import moment from "moment";
import { useUserContext } from "../hooks/Usercontext";
import { toast } from "sonner";
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
          toast.success("Booking Deleted successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  const startDate = moment(booking?.checkIn);
  const endDate = moment(booking?.checkOut);
  const duration = moment.duration(endDate.diff(startDate));
  return (
    <>
      <div className=" relative h-64">
        <div className=" h-full overflow-hidden shadow-xl shadow-gray-400 rounded-xl inline-block ">
          <img
            src={`http://localhost:3000/uploads/${booking?.restaurantId.images[0]}`}
            alt={`${booking?.restaurantId.name} image 1 `}
            className=" h-full object-cover brightness-[0.9]"
          />
        </div>
        <div className=" p-[18px] absolute w-11/12 -bottom-20 left-1/2 -translate-x-1/2 rounded-xl shadow-gray-400 shadow-lg bg-white">
          <div className=" flex items-center gap-1 text-[0.9rem] text-gray-700">
            <p>
              <Circle
                sx={{
                  height: "0.12em",
                  width: "0.12em",
                }}
              />{" "}
              {booking?.guests.adults + booking?.guests.children} Guest(s)
            </p>
            <p>
              <Circle
                sx={{
                  height: "0.12em",
                  width: "0.12em",
                }}
              />{" "}
              {booking?.restaurantId.whereToSleep.length} Bedroom
              {booking?.restaurantId.whereToSleep.length != 1 ? "s" : ""}
            </p>
          </div>

          <h2 className="text-lg font-semibold  ">
            {booking?.restaurantId.name}
          </h2>
          <div>
            <p className=" inline-block font-light text-gray-100 bg-black text-sm lg:py-[6px] py-[4px] px-[10px] rounded-full">
              <span>
                {duration.asDays() == 1
                  ? duration.asDays()
                  : duration.asDays() - 1}{" "}
                Night
                {duration.asDays() == 1 || duration.asDays() - 1 == 1
                  ? ""
                  : "s"}
              </span>
            </p>
            <p className=" mx-1 inline-block font-light text-gray-100 bg-black text-sm lg:py-[6px] py-[4px] px-[10px] rounded-full">
              {(booking?.restaurantId.price).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              <span>night</span>
            </p>
          </div>
          <p className="text-sm mt-2 flex items-center">
                <LocationOn
                  sx={{
                    fontSize: "1.1rem",
                    color: "red"
                  }}
                />
                <span className="">{booking?.restaurantId.address}</span>
              </p>
        </div>
      </div>
    </>
  );
};

export default Bookings;
