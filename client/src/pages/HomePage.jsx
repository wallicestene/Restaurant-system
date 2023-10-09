import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import RestauarantContainer from "../components/RestauarantContainer";

const HomePage = () => {
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
