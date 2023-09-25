const express = require("express")
const { addTable, getTablesByRestaurantId } = require("../controllers/tableController")
const router = express.Router()

router.post("/tables/restaurant", addTable)
router.get("/tables/restaurant/:id", getTablesByRestaurantId)

module.exports = router