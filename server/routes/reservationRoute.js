const express = require("express")
const { addReservation, deleteReservation } = require("../controllers/reservationController")
const router = express.Router()

router.post("/api/restaurant/reservation/", addReservation)
router.delete("/api/restaurant/reservation/:restaurantId", deleteReservation)

module.exports = router;