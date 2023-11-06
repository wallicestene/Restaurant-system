/* eslint-disable react/no-unescaped-entities */
import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../hooks/Usercontext";

const AccountPage = () => {
  const [{ user }, dispatch] = useUserContext();
  const { subPage } = useParams();
  const addStyles = (pageTitle=null) => {
    let styles = " py-2 px-3 cursor-pointer "
    if(pageTitle === subPage || (subPage === undefined && pageTitle === "myProfile") ){
      styles += " bg-totem-pole-500 rounded-full text-white"
    }
    return styles
  }
const LogOutUser = () => {
  localStorage.removeItem("user");
  dispatch({
    type: "LOGOUT_USER"
  })
}
  return (
    <div className=" pt-16 font-mulish">
      {
        // if the user is not logged in redirect to login page
        !user ? (
          <Navigate replace to="/login" />
        ) : (
          <>
            <nav>
              <ul className=" flex items-center justify-center gap-10 my-5">
                <li >
                  <Link className={addStyles("myProfile")} to="/account">My Profile</Link>
                </li>
                <li>
                  <Link className={addStyles("myBookings")} to="/account/myBookings">My Bookings</Link>
                </li>
                <li>
                  <Link className={addStyles("myFavorites")} to="/account/myFavorites">My Favorites</Link>
                </li>
              </ul>
            </nav>
            <div className=" flex flex-col gap-y-1 items-center text-sm w-11/12 mx-auto">
              <h3>You're Logged in as:</h3>
              <div>
                <div
                  style={{
                    height: "0.01rem",
                  }}
                  className=" bg-black opacity-20"
                />
                <div className="flex flex-col gap-1 p-2">
                  <p className=" grid grid-cols-2 gap-x-0 place-items-start">
                    <span className=" text-slate-900">First Name: </span>{" "}
                    <span className=" text-gray-500 text-xs">
                      {user?.first_name}
                    </span>
                  </p>
                  <p className=" grid grid-cols-2 place-items-start">
                    <span className=" text-slate-900 ">Last Name: </span>{" "}
                    <span className=" text-gray-500 text-xs">
                      {user?.last_name}
                    </span>
                  </p>
                  <p className=" grid grid-cols-2 place-items-start">
                    <span className=" text-slate-900">Email: </span>{" "}
                    <span className=" text-gray-500 text-xs">
                      {user?.email}
                    </span>
                  </p>
                </div>

                <button className=" bg-red-600 my-2 rounded-md py-2 w-full text-white">
                  Log Out
                </button>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default AccountPage;
