const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reservationSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref:"user"
    },
    restaurant_id: {
        type: mongoose.Types.ObjectId,
        ref:"restaurant"
    },
    table_id: {
        type: mongoose.Types.ObjectId,
        ref:"table"
    }
}, {timestamps: true})

module.exports = mongoose.model("reservation", reservationSchema)