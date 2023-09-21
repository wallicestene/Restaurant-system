const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,  //this is a string data type
        required : true
    }
})

module.exports = mongoose.model("user", userSchema)