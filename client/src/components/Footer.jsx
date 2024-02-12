import {
  Close,
  GitHub,
  Instagram,
  KeyboardArrowDown,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showFooter, setShowfooter] = useState(false);
  return (
    <footer
      className={`fixed bottom-0 left-0 z-10 w-full px-2 bg-white text-ebony-50 font-mulish border rounded-t-md transition-all duration-300 ease-linear h-10 flex items-center ${
        showFooter && " lg:h-[210px] h-[350px]"
      }`}
    >
      {!showFooter ? (
        <div className=" flex items-center justify-around flex-wrap h-10 w-full">
          <div className=" lg:text-sm text-xs text-neutral-500 grid place-items-center">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <Link to="/" className=" text-totem-pole-600">
                Bookify
              </Link>{" "}
              All rights reserved
            </p>
          </div>
          

          <div className="flex items-center justify-center gap-3 text-neutral-400">
            <a href="https://github.com/wallicestene">
              <div className=" h-8 w-8 grid place-items-center border border-ebony-50 rounded-full">
                <GitHub fontSize="small" />
              </div>
            </a>
            <a href="https://twitter.com/wallicestene">
              <div className=" h-8 w-8 grid place-items-center border rounded-full">
                <Twitter fontSize="small" />
              </div>
            </a>
            <a href="https://instagram.com/wallicestene">
              <div className=" h-8 w-8 grid place-items-center border border-ebony-50 rounded-full">
                <Instagram fontSize="small" />
              </div>
            </a>
            <a href="https://github.com/wallicestene">
              <div className=" h-8 w-8 grid place-items-center border rounded-full">
                <YouTube fontSize="small" />
              </div>
            </a>
          </div>
          <div>
            <button
              onClick={() => setShowfooter(!showFooter)}
              className=" h-8 w-8 grid place-items-center border rounded-full"
            >
              <KeyboardArrowDown />
            </button>
          </div>
        </div>
        
      ) : (
        <div className="py-5 px-1 lg:px-8">
          <div>
            <button
              onClick={() => setShowfooter(false)}
              className=" h-8 w-8 grid place-items-center border rounded-full"
            >
              <Close />
            </button>
          </div>
          <div className="  font-thin lg:grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-8 place-items-center flex flex-row flex-wrap">
            <div>
              <h1 className=" text-lg my-1 font-semibold text-totem-pole-600">
                Bookify
              </h1>
              <div className=" lg:text-sm text-xs  text-neutral-500 flex flex-col gap-2 overflow-ellipsis">
                <p>
                  <strong className=" text-ebony-50">Address: </strong> 123
                  street,Embakasi, KE, 12345 KENYA
                </p>
                <p>
                  <strong className=" text-ebony-50">Phone: </strong>+254 792
                  8174 28
                </p>
                <p>
                  <strong className=" text-ebony-50">Email: </strong>
                  wallicestenewaweru@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h1 className="  text-lg text-ebony-50 my-1 first-letter:uppercase font-semibold">
                Company
              </h1>
              <div className=" lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Blog</a>
                <a href="#">Terms & Policy</a>
              </div>
            </div>
            <div>
              <h1 className=" text-lg text-ebony-50 my-1 first-letter:uppercase font-semibold">
                Discover
              </h1>
              <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
                <a href="#">Trust & Safety</a>
                <a href="#">Travel Credit</a>
                <a href="#">Gift Cards</a>
                <a href="#">Bookify Picks</a>
              </div>
            </div>
            <div>
              <h1 className="text-lg text-ebony-50 my-1 first-letter:uppercase font-semibold">
                Hosting
              </h1>
              <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
                <a href="#">Why Host</a>
                <a href="#">Hospitality</a>
                <a href="#">Responsible Hosting</a>
                <a href="#">Home Safety</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
