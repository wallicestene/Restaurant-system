const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

//user LogIn
const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.login(email, password)
    .then((user) => {
      const token = createToken(user._id);
      const first_name = user.first_name;
      const last_name = user.last_name;
      res.status(200).json({ first_name, last_name, email, token, userId: user._id  });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

// user signup
const signupUser = (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  User.signup(first_name, last_name, email, password)
    .then((user) => {
      const token = createToken(user._id);
      res.status(200).json({ first_name, last_name, email, token, userId: user._id });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

module.exports = {
  loginUser,
  signupUser,
};
