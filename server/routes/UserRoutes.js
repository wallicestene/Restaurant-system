const express = require("express")
const { login, signup } = require("../controllers/userController")
const router = express.Router()

// login route
router.post("/login", login)

// signup rote

router.post("/signup", signup)

module.exports = router