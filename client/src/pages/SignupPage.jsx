import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className=" grid place-items-center h-screen ">
      <div className=" mb-24 lg:w-1/3 md:w-1/2 w-full lg:px-1 md:px-1 px-10 py-3">
        <h2 className=" text-center mb-2">Sign up</h2>
        <form className=" flex flex-col gap-y-2">
          <label htmlFor="firstName">
            First Name: <br />
            <input type="text" name="firstName" placeholder="First name" />
          </label>
          <label htmlFor="lastName">
            First Name: <br />
            <input type="text" name="lastName" placeholder="Last name" />
          </label>
          <label htmlFor="email">
            Email: <br />
            <input type="email" name="email" placeholder="Enter email" />
          </label>
          <label htmlFor="password">
            Password: <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </label>
          <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2">
            log In
          </button>
        </form>
        <div className=" text-center">
          <Link to="/login" className=" text-center">
            Already Registered? <span>Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
