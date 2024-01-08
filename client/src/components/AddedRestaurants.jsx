/* eslint-disable react/prop-types */

import { Image, LocationOn} from "@mui/icons-material";

const AddedRestaurants = ({restaurant}) => {
    return (
        <div className=" flex gap-x-2 bg-gray-200/90 w-full rounded-md overflow-hidden shadow-lg text-slate-900">
          <div className="leftDiv h-28 w-1/2  overflow-hidden ">
            <img
              src={`http://localhost:3000/uploads/${restaurant?.images[0]}`}
              alt={restaurant?.name}
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="rightDiv flex flex-col justify-between py-3 w-full">
            <h1 className=" text-base">{restaurant?.name}</h1>
            <div className=" flex gap-x-2 justify-around ">
              <p className=" flex items-center gap-x-1 bg-slate-900 px-2 py-1 text-totem-pole-50 rounded">
                <Image fontSize="small" />
                <span>Images  {restaurant?.images.length}</span>
              </p>
            </div>
            <p className=" flex items-center text-xs">
              <LocationOn
                sx={{
                  fontSize: "1.0rem",
                }}
              />
              {restaurant?.address}
            </p>
          </div>
        </div>
      );
}

export default AddedRestaurants