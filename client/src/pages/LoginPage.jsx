/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";
import { ErrorOutline } from "@mui/icons-material";

const LoginPage = () => {
  const [{ user }, dispatch] = useUserContext();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [logInError, setLogInError] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
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
          setLogInError(null);
        }
      })
      .catch((error) => {
        setLogInError(error.message);
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
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className=" grid place-items-center h-screen font-mulish bg-gradient-to-tr from-red-600 via-orange-500 to-orange-300 text-sm">
      <div className=" flex flex-col gap-y-3 lg:w-5/12 md:w-1/2 w-full lg:p-5 md:px-1 px-3 py-5 rounded-md bg-slate-100 shadow-lg ">
        <h2 className=" text-center text-base">Log In</h2>
        <form className=" flex flex-col gap-y-3" onSubmit={handlesubmit}>
          <label htmlFor="email">
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
          <label htmlFor="password">
            Password: <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={userDetails.password}
              onChange={handleChange}
              className=" border-none outline-non text-slate-950 shadow-lg"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 shadow-lg">
            Log In
          </button>
        </form>
        {logInError && (
          <div className=" text-center border border-red-500 text-red-500 my-2 rounded-md bg-red-300 py-1">
            <div className=" flex items-center justify-center gap-x-1">
              <ErrorOutline/>
              <p>{logInError}!</p>
            </div>
          </div>
        )}
        <div className=" text-center text-xs">
          <span>Not Registered? </span>
          <Link to="/signup" className=" text-center">
            <span className=" underline text-blue-800">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
