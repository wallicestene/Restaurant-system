/* eslint-disable no-unused-vars */
import { Alert } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";

const SignupPage = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [signUpError, setSignUpError] = useState(null);
  const [{user}, dispatch] = useUserContext()
  const handlesubmit = (e) => {
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
          dispatch({
            type: "SIGNUP_USER",
            user: data
          })
        }
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  return (
    <div className=" grid place-items-center h-screen ">
      <div className=" mb-24 lg:w-1/3 md:w-1/2 w-full lg:px-1 md:px-1 px-10 py-3">
        <h2 className=" text-center mb-2">Sign Up</h2>
        <form className=" flex flex-col gap-y-2" onSubmit={handlesubmit}>
          <label htmlFor="first_name">
            First Name: <br />
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={userDetails.first_name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="last_name">
            First Name: <br />
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              value={userDetails.last_name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email: <br />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={handleChange}
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
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2">
            Sign Up
          </button>
        </form>
        {signUpError && (
          <div className=" text-center border border-red-500 text-red-500 my-2 rounded-md bg-red-300 py-1">
            <div className=" flex items-center justify-center">
              <p>{signUpError}</p>
            </div>
          </div>
        )}
        <div className=" text-center text-sm">
          <Link to="/login" className=" text-center">
            Already Registered? <span className=" text-blue-800">Log In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
