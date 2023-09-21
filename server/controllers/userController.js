const User = require("../models/userModel")
const mongoose = require("mongoose")

// LogIn
const login = (req,res) => {
    res.json({mssg: "login user"})
}
const signup = (req,res) => {
    res.json({mssg: "signup user"})
}

module.exports = {
    login,
    signup
}