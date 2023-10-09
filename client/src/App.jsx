import React from "react";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
