// import React from "react";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="account/:subPage?" element={<AccountPage/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
