const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
});

// static login method

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password); 

  if (!match) {
    throw Error("Incorrect password"); // invalid login credentials
  }

  return user;
};

// static signup method
userSchema.statics.signup = async function (
  first_name,
  last_name,
  email,
  password
) {
  // validation
  if (!first_name || !last_name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  //   check if the email already email
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Use bcryptjs for salt generation and hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    first_name,
    last_name,
    email,
    password: hash, // Store the hashed password
  });

  return user;
};

module.exports = mongoose.model("user", userSchema);
