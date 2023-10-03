const express = require("express")
const { addTable, getTablesByRestaurantId } = require("../controllers/tableController")
const router = express.Router()

router.post("/api/tables/restaurant", addTable)
router.get("/api/tables/restaurant/:id", getTablesByRestaurantId)

module.exports = router