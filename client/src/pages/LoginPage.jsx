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
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
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
          setRedirect(true)
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
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-500  grid  place-items-center h-screen font-mulish text-sm px-4">
      <div className=" bg-white flex flex-col gap-y-3 lg:w-5/12 md:w-1/2 w-full lg:p-5 md:px-1 px-3 py-5 rounded-md shadow-lg ">
        <h2 className=" text-center text-base">Log In</h2>
        <form className=" flex flex-col gap-y-3" onSubmit={handleSubmit}>
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
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={userDetails.password}
              onChange={handleChange}
              className=" border outline-non text-slate-950 shadow-lg h-12 bg-none"
            />
          </label>
          <button className="bg-gradient-to-l from-rose-400 via-fuchsia-500 rounded-b-lg to-indigo-500 rounded-md py-2 shadow-lg h-12">
            Log In
          </button>
        </form>
        {logInError && (
          <div className=" text-center border border-red-500 text-red-500 my-2 rounded-md bg-red-300 py-1 ">
            <div className="h-10 flex items-center justify-center gap-x-1">
              <ErrorOutline/>
              <p>{logInError}!</p>
            </div>
          </div>
        )}
        <div className=" text-center text-xs">
          <span className="">Not Registered? </span>
          <Link to="/signup" className=" text-center">
            <span className=" underline text-blue-800">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
