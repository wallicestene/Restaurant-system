/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useUserContext } from "../hooks/Usercontext";
import { Navigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { Avatar } from "@mui/material";
const Profile = () => {
  const [redirect, setRedirect] = useState(null);
  const [{ user }, dispatch] = useUserContext();
  const LogOutUser = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "LOGOUT_USER",
    });
    setRedirect("/");
  };
  if (!user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="  flex flex-col items-center py-20 text-sm lg:w-11/12 mx-auto w-full px-2 font-Mulish">
      <AccountNav />
      <div className="lg:w-1/2 w-full grid place-items-center border border-gray-300 shadow-lg shadow-gray-400 rounded-lg overflow-hidden">
        <div className="relative flex items-center gap-2 bg-gradient-to-l from-rose-400 via-fuchsia-500 rounded-b-lg to-indigo-500 h-52 w-full p-2">
          <div className=" absolute z-10 -bottom-24 right-1/2 translate-x-1/2 -translate-y-1/2">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "#0F172A",
                fontSize: "3rem",
              }}
            >
              {user?.first_name[0]}
            </Avatar>
          </div>
        </div>
        <div className="w-full p-5">
          <div className=" mt-5">
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              Hello, {`${user?.first_name} ${user?.last_name}`}
            </h1>
          </div>
          <div className="my-4 h-12 text-gray-600 text-[1rem] flex items-center justify-center rounded-lg ">
            <p>{user?.email}</p>
          </div>
          <div>
            <button
            onClick={LogOutUser}
              className="inline-flex text-lg items-center justify-center h-12 px-10 py-0 font-semibold text-center no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-black border-solid rounded-lg cursor-pointer select-none hover:text-white hover:bg-black w-full hover:border-white focus:shadow-xs focus:no-underline"
            >Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
