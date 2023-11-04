/* eslint-disable react/no-unescaped-entities */
import { useUserContext } from "../hooks/Usercontext";

const AccountPage = () => {
  const [{ user }, dispatch] = useUserContext();
  return (
    <div className=" pt-16 font-mulish">
      <div>
        <ul className=" flex items-center justify-center gap-10 my-5">
          <li>My Profile</li>
          <li>My Bookings</li>
          <li>My Favorites</li>
        </ul>
      </div>
      <div className=" flex flex-col gap-y-1 items-center text-sm w-11/12 mx-auto">
        <h3>You're Logged in as:</h3>
        <div className="flex flex-col gap-1">
          <div
            style={{
              height: "0.01rem",
            }}
            className=" bg-black opacity-20"
          />
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
          <button className=" bg-red-500 my-2 rounded-md py-2">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
