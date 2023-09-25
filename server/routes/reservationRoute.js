const express = require("express")
const { addReservation, deleteReservation } = require("../controllers/reservationController")
const router = express.Router()

router.post("/restaurant/reservation", addReservation)
router.delete("/restaurant/reservation/:id", deleteReservation)

module.exports = router;