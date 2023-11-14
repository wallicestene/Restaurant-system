const express = require("express")
const { addReservation, deleteReservation, getUserReservations } = require("../controllers/reservationController")

const requireAuth = require("../middleware/requireAuthentication")
const router = express.Router()
// require auth for all reservation routes
router.use(requireAuth)
router.post("/api/restaurant/reservation", addReservation)
router.get("/api/reservations/", getUserReservations)
router.delete("/api/restaurant/reservation/:restaurantId", deleteReservation)

module.exports = router;