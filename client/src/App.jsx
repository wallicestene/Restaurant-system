// import React from "react";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import AccountPage from "./pages/AccountPage";
import Profile from "./pages/Profile";
import { Toaster } from 'sonner'
import { useUserContext } from "./hooks/Usercontext";
import { useEffect } from "react";
import RestaurantsPage from "./pages/RestarantsPage";
import PlacesForm from "./pages/PlacesForm";
import MyBookings from "./pages/MyBookings";
import ImageGallery from "./components/ImageGallery";
const App = () => {
  const [, dispatch] = useUserContext();
  // updating the auth state
  useEffect(() => {
    const updateAuthState = () => {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser) {
        dispatch({ type: "SET_USER", payload: loggedUser });
      } else {
        dispatch({ type: "LOGOUT_USER" });
      }
    };
    updateAuthState();
  }, [dispatch]);
  return (
    <Router>
       <Toaster  position="top-left" richColors  />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/account" element={<Profile/>} />
          <Route path="/account/myListings" element={<RestaurantsPage/>} />
          <Route path="/account/myBookings" element={<MyBookings/>} />
          <Route path="/account/myRestaurants/new" element={<PlacesForm />} />
          <Route path="/account/myRestaurants/:id" element={<PlacesForm />} />
          <Route path="/imageGallery/:id" element={<ImageGallery />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
