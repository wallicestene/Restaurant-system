/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";

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
  return (
    <div className=" grid place-items-center h-screen ">
      <div className=" mb-24 lg:w-1/3 md:w-1/2 w-full lg:px-1 md:px-1 px-10 py-3">
        <h2 className=" text-center mb-2">Log In</h2>
        <form className=" flex flex-col gap-y-2" onSubmit={handlesubmit}>
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
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              value={userDetails.password}
              onChange={handleChange}
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2">
            log In
          </button>
        </form>
        {logInError && (
          <div className=" text-center border border-red-500 text-red-500 my-2 rounded-md bg-red-300 py-1">
            <div className=" flex items-center justify-center">
              {/* <Error /> */}
              <p>{logInError}</p>
            </div>
          </div>
        )}
        <div className=" text-center text-sm">
          <Link to="/signup" className=" text-center">
            Not Registered?{" "}
            <span className=" underline text-blue-800">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
