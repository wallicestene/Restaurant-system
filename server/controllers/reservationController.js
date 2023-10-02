const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");

// add reservation
const addReservation = (req, res) => {
  const { userId, restaurantId, tableId, date } = req.body;
  Reservation.findOne({ tableId, date })
    .then((reservationExists) => {
      if (!reservationExists) {
        Reservation.create({ userId, restaurantId, tableId, date })
          .then((reservation) => {
            res.status(200).json(reservation);
          })
          .catch((error) => {
            res.status(500).json({
              error: `Error occured while adding reservation ${error}`,
            });
          });
    } else {
        throw Error("Table is already reserved for that date.");
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
// delete aresevation

const deleteReservation = (req, res) => {
  const { restaurantId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
    res.status(404).json(`no reservations found with the given ID`);
  }

  Reservation.findByIdAndDelete(restaurantId)
    .then((result) => {
      if (!result) {
        return res.status(404).json("no reservation found");
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "error in deleting the reservation",
      });
    });
};
module.exports = {
  addReservation,
  deleteReservation,
};
