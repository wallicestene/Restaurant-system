const express = require("express")
const { signupUser, loginUser } = require("../controllers/userController")
const router = express.Router()

// login route
router.post("/user/login", loginUser)

// signup rote

router.post("/user/signup", signupUser)

module.exports = router