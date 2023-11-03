// import React from "react";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import Layout from "./layouts/Layout";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
