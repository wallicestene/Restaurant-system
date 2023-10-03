const express = require("express")
const { addRestaurant, findAllRestaurants, findOneRestaurant, deleteRestaurant } = require("../controllers/restaurantController")
const router = express.Router()

router.post("/api/restaurant", addRestaurant)
router.get("/api/restaurant", findAllRestaurants)
router.get("/api/restaurant/:id", findOneRestaurant)
router.delete("/api/restaurant/:id", deleteRestaurant)

module.exports = router