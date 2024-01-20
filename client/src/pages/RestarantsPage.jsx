import { Link } from "react-router-dom";
import AddedRestaurants from "../components/AddedRestaurants";
import useFetch from "../hooks/useFetch";
import { Alert, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useUserContext } from "../hooks/Usercontext";
import AccountNav from "../components/AccountNav";
const RestarantsPage = () => {
  const [{ user }] = useUserContext();
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/restaurants/owner/${user?.userId}`
  );
  return (
    <div className=" lg:w-11/12  mx-auto w-full py-20 px-2 font-Montserrat">
      <AccountNav />
      <div className=" flex justify-center ">
        <Link
          className=" py-1 px-2 cursor-pointer flex item-center justify-center gap-x-1 bg-totem-pole-500 rounded-full text-totem-pole-50 w-fit"
          to="/account/myRestaurants/new"
        >
          <Add />
          <span>Add new Restaurant</span>
        </Link>
      </div>
      {isLoading && (
        <CircularProgress color="secondary" size={50} thickness={4} />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!isLoading && data.length > 0 && (
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-24 p-2 lg:place-items-start place-items-center">
          {data?.map((restaurant) => (
           
              <AddedRestaurants key={restaurant._id} restaurant={restaurant} />
            
          ))}
        </div>
      )}
    </div>
  );
};

export default RestarantsPage;
