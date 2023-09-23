const express = require("express")
const { addTable, getTablesByRestaurantId } = require("../controllers/tableController")
const router = express.Router()

router.post("/restaurant/table", addTable)
router.get("/restaurant/table/:id", getTablesByRestaurantId)

module.exports = router