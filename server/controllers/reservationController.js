const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");
const Table = require("../models/tableModel");

// Add a reservation and update the table occupancy
const addReservation = (req, res) => {
  const { userId, restaurantId, tableId, date } = req.body;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  console.log(date);
  console.log(formattedDate);

  // Checking if the table is already reserved for the given date
  Reservation.findOne({ tableId, date })
    .then((reservationExists) => {
      if (!reservationExists) {
        // Create a new reservation
        Reservation.create({ userId, restaurantId, tableId, date })
          .then((reservation) => {
            // Updating the table's "occupied" status
            Table.findById(tableId)
              .then((table) => {
                // Checking if the date is not already in the occupiedDates array
                if (!table.occupiedDates.includes(date)) {
                  // Marking the table as occupied for the date
                  table.occupied = date === formattedDate ? true : false;
                  table.occupiedDates.push(date);

                  // Save the updated table
                  table
                    .save()
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
                } else {
                  res.status(200).json(reservation); // Table is already marked as occupied for the date
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
        res
          .status(400)
          .json({ error: "Table is already reserved for that date." });
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
  deleteReservation,
};
