import { Favorite, GitHub, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="text-ebony-50  bg-black py-8 px-1 lg:px-10 font-Montserrat ">
    <div className="  lg:grid lg:grid-cols-4 grid-cols-2 lg:gap-5 gap-8 place-items-center flex flex-row flex-wrap">
      <div>
        <h1 className=" lg:text-2xl text-lg my-1 font-semibold text-totem-pole-500">
        Bookify
        </h1>
        <div className=" lg:text-sm text-xs  text-neutral-500 flex flex-col gap-2 overflow-ellipsis">
          <p>
            <strong className=" text-ebony-50">Address: </strong> 123
            street,Embakasi, KE, 12345 KENYA
          </p>
          <p>
            <strong className=" text-ebony-50">Phone: </strong>+254 792 8174
            28
          </p>
          <p>
            <strong className=" text-ebony-50">Email: </strong>
            wallicestenewaweru@gmail.com
          </p>
        </div>
      </div>
      <div>
        <h1 className=" lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">
          Customer Services
        </h1>
        <div className=" lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>Shipping Policy</p>
          <p>Compensation First</p>
          <p>Return Policy</p>
          <p>Shipping Info</p>
        </div>
      </div>
      <div>
        <h1 className=" lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">
          Information
        </h1>
        <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>About Us</p>
          <p>Prices Drop</p>
          <p>New Products</p>
          <p>Best Sales</p>
        </div>
      </div>
      <div>
        <h1 className="lg:text-2xl text-lg text-ebony-50 my-1 uppercase font-semibold">
          Contact Us
        </h1>
        <div className="lg:text-sm text-xs text-neutral-500 flex flex-col gap-2">
          <p>Delivery</p>
          <p>Legal Notice</p>
          <p>Contact Us</p>
          <p>Sitemap</p>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-center gap-3 my-5 text-neutral-400">
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
    <div  className=" lg:text-sm text-xs  text-neutral-500 grid place-items-center">
      <p>
      &copy; 2023 <Link to="/" className=" text-orange-500">E-Shop</Link> All rights reserved
      </p>
      <p className=" my-1">
        Made with <span className=" text-red-600"><Favorite fontSize="small"/></span> By Wallicestene Waweru
      </p>
    </div>
  </footer>
  )
}

export default Footer