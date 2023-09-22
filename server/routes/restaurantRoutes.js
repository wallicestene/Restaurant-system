const express = require("express")
const { addRestaurant } = require("../controllers/restaurantController")
const router = express.Router()

router.post("/restaurant/addRestaurant", addRestaurant)

module.exports = router