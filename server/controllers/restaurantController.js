const mongoose = require("mongoose")
const Restaurant = require("../models/restaurantModel")

// add a restaurant

const addRestaurant = (req,res) => {
    const {name,address,image,menu,contacts} = req.body
    Restaurant.create({
        name,
        address,
        image,
        menu,
        contacts
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json({error: err.message})
    })
}
module.exports = {
    addRestaurant
}