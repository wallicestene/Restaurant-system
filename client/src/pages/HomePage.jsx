import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import RestauarantContainer from "../components/RestauarantContainer";

const HomePage = () => {
  const [showNavbar,setShowNavbar] = useState(false)
  useEffect(() => {
    const addEventListener =() =>{
      if (window.scrollY > 100) {
        setShowNavbar(true)
      }
      else{
        setShowNavbar(false)
      }
    }
    window.addEventListener("scroll", addEventListener())

    return window.removeEventListener("scroll", addEventListener())
  }, [])
  return (
    <section>
      <div>
        <Navbar />
        <div className=" lg:w-11/12 lg:mx-auto">
          <Filter />
          <RestauarantContainer />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
