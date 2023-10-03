const express = require("express")
const { signupUser, loginUser } = require("../controllers/userController")
const router = express.Router()

// login route
router.post("api/login", loginUser)

// signup rote

router.post("api/signup", signupUser)

module.exports = router