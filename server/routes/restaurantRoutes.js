const express = require("express")
const { addRestaurant, findAllRestaurants, findOneRestaurant, deleteRestaurant } = require("../controllers/restaurantController")
const router = express.Router()

router.post("/restaurant", addRestaurant)
router.get("/restaurant", findAllRestaurants)
router.get("/restaurant/:id", findOneRestaurant)
router.delete("/restaurant/id", deleteRestaurant)

module.exports = router