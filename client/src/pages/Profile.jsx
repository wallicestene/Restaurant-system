/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useUserContext } from "../hooks/Usercontext";
import { Navigate } from "react-router-dom";

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
  // if (!user && !redirect) {
  //   return <Navigate to={"/login"} />;
  // }
  // if (redirect) {
  //   return <Navigate to={redirect} />;
  // }
  return (
    <>
      <div className=" bg-gray-200 bg-opacity-90 py-2 px-4 rounded lg:w-1/2 w-full">
        <h3 className=" text-center">You're Logged in as:</h3>
        <div
          style={{
            height: "0.01rem",
          }}
          className=" bg-black opacity-20"
        />
        <div className="flex flex-col gap-1 p-2">
          <p className=" grid grid-cols-2 gap-x-0 place-items-start">
            <span className=" text-slate-900">First Name: </span>{" "}
            <span className=" text-gray-500 text-xs">{user?.first_name}</span>
          </p>
          <p className=" grid grid-cols-2 place-items-start">
            <span className=" text-slate-900 ">Last Name: </span>{" "}
            <span className=" text-gray-500 text-xs">{user?.last_name}</span>
          </p>
          <p className=" grid grid-cols-2 place-items-start">
            <span className=" text-slate-900">Email: </span>{" "}
            <span className=" text-gray-500 text-xs">{user?.email}</span>
          </p>
          <button
            className=" bg-red-600 rounded-md py-2 w-full text-white"
            onClick={LogOutUser}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
