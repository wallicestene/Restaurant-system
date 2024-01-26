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
    <div className=" flex flex-col items-center h-screen pt-20 text-sm lg:w-11/12 mx-auto w-full px-2">
      <AccountNav />
      <div className="w-full grid place-items-center">
        <div className=" flex items-center gap-2 bg-gradient-to-l from-rose-400 via-fuchsia-500 rounded-md to-indigo-500 h-40 lg:w-1/2 w-full p-2">
          <div>
            <Avatar sx={{ width: 50, height: 50, backgroundColor: "#0F172A" }}>
              {user?.first_name[0]}
            </Avatar>
          </div>
          <div>
            <div className=" flex items-center gap-x-[2px]">
              <p>@{user?.first_name}</p>
              <p>{user?.last_name}</p>
            </div>
            <p className="text-xs font-light text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
