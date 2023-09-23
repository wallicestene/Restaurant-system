const mongoose = require("mongoose")
const Reservation = require("../models/reservationModel")

const addReservation = (req,res) => {
    const {user_id, restaurant_id, table_id} = req.body
    Reservation.create({user_id, restaurant_id, table_id})
    .then(result => {
        res.status(200).json(result)
    }).catch((error) => {
        console.log('Error: ', error);
    })
}