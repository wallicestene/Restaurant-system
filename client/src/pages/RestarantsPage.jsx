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
    <div className=" lg:w-1/2 mx-auto w-full pt-20">
      <AccountNav />
      <div className=" flex justify-center">
        <Link
          className=" py-1 px-2 cursor-pointer flex item-center gap-x-1 bg-totem-pole-500 rounded-full text-totem-pole-50 w-fit"
          to="/account/myRestaurants/new"
        >
          <Add fontSize="small" />
          <span>Add new Restaurant</span>
        </Link>
      </div>
      {isLoading && (
        <CircularProgress color="secondary" size={50} thickness={4} />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!isLoading && data.length > 0 && (
        <div className=" mt-4 flex flex-col gap-y-3">
          {data?.map((restaurant) => (
            <Link key={restaurant._id} to={`/account/myRestaurants/${restaurant._id}`}>
              <AddedRestaurants restaurant={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestarantsPage;
