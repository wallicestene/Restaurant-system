const express = require("express")
const { addReservation, deleteReservation } = require("../controllers/reservationController")
const router = express.Router()

router.post("/restaurant/reservation/", addReservation)
router.delete("/restaurant/reservation/:restaurantId", deleteReservation)

module.exports = router;