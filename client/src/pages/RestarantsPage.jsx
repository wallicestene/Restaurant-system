import { Link } from "react-router-dom";
import AddedRestaurants from "../components/AddedRestaurants";
import useFetch from "../hooks/useFetch";
import { Alert } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useUserContext } from "../hooks/Usercontext";
import AccountNav from "../components/AccountNav";
import BeatLoader from "react-spinners/BeatLoader";
import useServer from "../hooks/ServerUrl";
const RestarantsPage = () => {
  const [{ user }] = useUserContext();
  const { data, isLoading, error } = useFetch(
    `${useServer()}api/restaurants/owner/${user?.userId}`
  );
  return (
    <div className=" lg:w-11/12  mx-auto w-full py-28 px-2 font-Mulish">
      <AccountNav />
      <div className=" flex justify-center ">
        <Link
          className="inline-flex items-center justify-center gap-2 h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
          to="/account/myRestaurants/new"
        >
          <Add />
          <span>Add new Listing</span>
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-48">
          <BeatLoader color="#ff7a00" size={20} speedMultiplier={0.8} />
        </div>
      )}
      {error && (
        <div className="w-full h-48 flex items-center justify-center">
          <Alert severity="error">{error}</Alert>
        </div>
      )}
      {!isLoading && data.length > 0 && (
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-24 p-6 lg:place-items-start place-items-center">
          {data?.map((restaurant) => (
            <AddedRestaurants key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestarantsPage;
