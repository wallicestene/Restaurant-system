/* eslint-disable no-unused-vars */
import { Alert } from "@mui/material";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import { ErrorOutline } from "@mui/icons-material";
import logo from "../assets/loginFormImages/Bookify (200 x 200 px) (Website) (2).svg";
import useServer from "../hooks/ServerUrl";
import { toast } from "sonner";

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    fetch(`${useServer()}user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "Password not strong enough") {
            toast.error(
              "Strong passwords are at least 8 characters long and include a mix of uppercase, lowercase, and special characters.",{
                duration: 7000,
              }
            );
          }
          throw Error(data.error);
        } else {
          // saving user to local storage
          localStorage.setItem("user", JSON.stringify(data));
          // updating the user context
          dispatch({ type: "SET_USER", payload: data });
          setSignUpError(null);
          setRedirect(true);
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
    <div className="bg-gradient-to-r from-orange-600 to-orange-500  grid  place-items-center h-screen font-mulish text-sm px-4">
      <div className="bg-white flex flex-col gap-y-3 lg:w-5/12 md:w-1/2 w-full lg:p-5 md:px-1 px-3 py-5 rounded-md shadow-lg text-sm">
        <div className=" flex flex-col justify-center items-center text-[1.5rem] font-semibold">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className=" h-14 w-36 object-center object-contain rounded-md"
            />
          </Link>
          <h2>
            Welcome to <span className=" text-totem-pole-600">Bookify</span>
          </h2>
        </div>
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
                className=" border outline-none text-slate-950 shadow-lg h-12 bg-none"
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
                className=" border outline-none text-slate-950 shadow-lg h-12 bg-none"
              />
            </label>
          </div>

          <label htmlFor="email">
            Email: <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
              className=" border outline-none text-slate-950 shadow-lg h-12 bg-none"
            />
          </label>
          <label htmlFor="password">
            Password: <br />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userDetails.password}
              onChange={handleChange}
              className=" border outline-none text-slate-950 shadow-lg h-12 bg-none"
            />
          </label>
          <button className="bg-gradient-to-l from-rose-400 via-fuchsia-500 rounded-b-lg to-indigo-500 rounded-md py-2 shadow-lg h-12 text-white font-semibold tracking-wide text-[1rem]">
            Sign Up
          </button>
        </form>
        {signUpError && (
          <Alert variant="filled" severity="error">
            {signUpError}
          </Alert>
        )}
        <div className=" text-center text-xs">
          <span>Already Registered?</span>{" "}
          <Link to="/login" className=" text-center">
            <span className=" text-blue-800">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
