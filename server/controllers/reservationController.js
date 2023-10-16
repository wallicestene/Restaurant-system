const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");
const Table = require('../models/tableModel');

// Add a reservation and update the table occupancy
const addReservation = (req, res) => {
  const { userId, restaurantId, tableId, date } = req.body;

  Reservation.findOne({ tableId, date })
    .then((reservationExists) => {
      if (!reservationExists) {
        // Create a new reservation
        Reservation.create({ userId, restaurantId, tableId, date })
          .then((reservation) => {
            // Update the table's "occupied" status
            Table.findByIdAndUpdate(tableId, { occupied: true })
              .then((updatedTable) => {
                if (!updatedTable) {
                  res.status(404).json({ error: 'Table not found.' });
                } else {
                  res.status(200).json(reservation);
                }
              })
              .catch((error) => {
                res.status(500).json({
                  error: `Error occurred while updating table occupancy: ${error}`,
                });
              });
          })
          .catch((error) => {
            res.status(500).json({
              error: `Error occurred while adding reservation: ${error}`,
            });
          });
      } else {
        throw new Error("Table is already reserved for that date.");
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
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).json("no reservation found");
      } else {
        Table.findByIdAndUpdate(reservation.tableId, {occupied: false})
        .then(updatedTable => {
          if(!updatedTable){
            res.status(404).json('No table found')
          }else{
            res.status(200).json(reservation)
          }
        }).catch(error => {
          res.status(500).json({error: `Error while trying to update table for reservation deletion Error: ${error}`})
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "error in deleting the reservation",
      });
    });
};
module.exports = {
  addReservation,
  deleteReservation,
};
