const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};
//user LogIn
const loginUser = (req, res) => {
  res.json({ mssg: "login user" });
};
// user signup
const signupUser = (req, res) => {
  const { email, password } = req.body;
  User.signup(email, password)
    .then((user) => {
      const token = createToken(user._id);
      res.status(200).json({ email, token });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  loginUser,
  signupUser,
};
