import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";
import RestauarantContainer from "../components/RestauarantContainer";

const HomePage = () => {
  return (
    <section>
      <div>
        <div >
          <Filter />
          <RestauarantContainer />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
