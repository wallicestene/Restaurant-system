const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");

// add reservation
const addReservation = (req, res) => {
  const { user_id, restaurant_id, table_id } = req.body;
  Reservation.create({ user_id, restaurant_id, table_id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        error: `Error occured while adding reservation ${err}`,
      });
    });
};
// delete aresevation

const deleteReservation = (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json(`No reservations found with the given ID`);
  }
  Reservation.findByIdAndDelete(id).then(result => {
    if(!result){
        res.status(404).send('no reservation found')
    }else{
        res.status(200).json(result)
    }
  }).catch(err => {
    res.status(500).json({
        error: "error in deleting the reservation" ,
    })
  })
};
module.exports = {
  addReservation,
};
