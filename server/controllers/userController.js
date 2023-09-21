const User = require("../models/userModel");
const mongoose = require("mongoose");

// LogIn
const loginUser = (req, res) => {
  res.json({ mssg: "login user" });
};
const signupUser = (req, res) => {
  const { email, password } = req.body;
  User.signup(email, password)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  loginUser,
  signupUser,
};
