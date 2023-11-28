const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");
const Table = require("../models/tableModel");
const moment = require("moment");

// Add a reservation and update the table occupancy
const addReservation = (req, res) => {
  const { userId, restaurantId, tableId, date } = req.body;
  const today = new Date();
  const formattedToday = moment(today).format("YYYY-MM-DD");
  // Checking if the table is already reserved for the given date
  Reservation.findOne({ tableId, date })
    .then((reservationExists) => {
      if (!reservationExists) {
        // Create a new reservation
        Reservation.create({ userId, restaurantId, tableId, date })
          .then((reservation) => {
              Table.findByIdAndUpdate(tableId, {
                occupied: true,
              })
                .then((updatedTable) => {
                  if (!updatedTable) {
                    res.status(404).json({ error: "Table not found." });
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
        throw Error("Table is already reserved for that date.");
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
// get Reservation by userId
const getUserReservations = (req, res) => {
  const { userId } = req.query;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(404).json(`no user found with the given Id`);
  }

  Reservation.find({ userId })
    .populate("restaurantId")
    .populate("tableId")
    .then((reservations) => {
      if (!reservations) {
        return res.status(404).json("No reservations found!");
      }
      res.status(200).json(reservations);
    })
    .catch(() => {
      res.status(500).json({
        error: "error while finding the reservations",
      });
    });
};
// delete a reservation

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
        Table.findByIdAndUpdate(reservation.tableId, { occupied: false })
          .then((updatedTable) => {
            if (!updatedTable) {
              res.status(404).json("No table found");
            } else {
              res.status(200).json(reservation);
            }
          })
          .catch((error) => {
            res.status(500).json({
              error: `Error while trying to update table for reservation deletion Error: ${error}`,
            });
          });
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
  getUserReservations,
  deleteReservation,
};
