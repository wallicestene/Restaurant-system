// /* eslint-disable no-unused-vars */
// /* eslint-disable react/no-unescaped-entities */
// import { Link, Navigate, useParams } from "react-router-dom";
// import { useUserContext } from "../hooks/Usercontext";
// import {
//   Add,
//   FormatListBulleted,
//   PersonOutline,
//   RestaurantMenu,
// } from "@mui/icons-material";
// import Profile from "./Profile";
// import MyBookings from "./MyBookings";
// import MyRestaurants from "./MyRestaurants";

// const AccountPage = () => {
//   const [{ user }, dispatch] = useUserContext();
//   return (
//     <div className=" pt-16 font-mulish">
//       {/* {
//         // if the user is not logged in redirect to login page
//         !user ? (
//           <Navigate replace to="/" />
//         ) : ( */}
//       <>
        
//         <div className=" grid place-items-center gap-y-1 items-center text-sm py-2 px-4">
//           {subPage === undefined && <Profile />}
//           {subPage === "myBookings" && <MyBookings subPage={subPage} />}
//           {subPage === "myFavorites" && <MyRestaurants />}
//         </div>
//       </>
//       {/* )
//       } */}
//     </div>
//   );
// };

// export default AccountPage;
