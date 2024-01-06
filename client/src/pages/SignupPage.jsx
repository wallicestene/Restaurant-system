/* eslint-disable no-unused-vars */
import { Alert } from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import { ErrorOutline } from "@mui/icons-material";

const SignupPage = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [signUpError, setSignUpError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [{ user }, dispatch] = useUserContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        } else {
          // saving user to local storage
          localStorage.setItem("user", JSON.stringify(data));
          // updating the user context
          dispatch({ type: "SET_USER", payload: data });
          setSignUpError(null);
          setRedirect(true)
        }
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className=" bg-[url('.\assets\loginFormImages\restaurant1.png')] bg-cover bg-center grid place-items-center h-screen font-mulish text-sm text-white">
      <div className=" backdrop-blur-md border border-totem-pole-200  flex flex-col gap-y-3 lg:w-5/12 md:w-1/2 w-full lg:p-5 md:px-1 px-3 py-5 rounded-md shadow-lg text-sm">
        <h2 className=" text-center text-base">Sign Up</h2>
        <form className=" flex flex-col gap-y-3" onSubmit={handleSubmit}>
          <div className=" flex w-full gap-3 items-center justify-between">
            <label htmlFor="first_name" className=" w-full">
              First Name: <br />
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First name"
                value={userDetails.first_name}
                onChange={handleChange}
                className=" border-none outline-none text-slate-950 shadow-lg"
              />
            </label>
            <label htmlFor="last_name" className=" w-full">
              Last Name: <br />
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last name"
                value={userDetails.last_name}
                onChange={handleChange}
                className=" border-none outline-none text-slate-950 shadow-lg"
              />
            </label>
          </div>

          <label htmlFor="email" >
            Email: <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
              className=" border-none outline-none text-slate-950 shadow-lg"
            />
          </label>
          <label htmlFor="password" >
            Password: <br />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userDetails.password}
              onChange={handleChange}
              className=" border-none outline-none text-slate-950 shadow-lg"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 shadow-lg">
            Sign Up
          </button>
        </form>
        {signUpError && (
          <div className=" text-center border border-red-500 text-red-500 my-2 rounded-md bg-red-300 py-1">
            <div className=" flex items-center justify-center gap-x-1">
              <ErrorOutline/>
              <p>{signUpError}!</p>
            </div>
          </div>
        )}
        <div className=" text-center text-xs">
          <span className=" text-white ">Already Registered?</span>{" "}
          <Link to="/login" className=" text-center">
            <span className=" text-blue-800">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
