const mongoose = require("mongoose");
const Reservation = require("../models/reservationModel");
const Table = require("../models/tableModel");
const moment = require("moment");
const schedule = require("node-schedule");

const updateTableOccupancy = () => {
  const today = new Date();
  const formattedToday = moment(today).format("YYYY-MM-DD");
  // find upcoming reservations
  Reservation.find({date:{ $gte: formattedToday}})
  .then(upcomingReservations => {
    // find expired reservation
    return Reservation.find({date: {$lt: formattedToday}})
    .then(expiredReservations => {
      // update tables for upcomming reservations
      const updateUpcomingTables = upcomingReservations.map(reservation => Table.findByIdAndUpdate(reservation.tableId, {occupied: true}))
      // update tables for expired reservations
      const updateExpiredTables = expiredReservations.map(reservation => Table.findOneAndUpdate(reservation.tableId, {occupied: false}))
      return Promise.all([...updateUpcomingTables, ...updateExpiredTables])
    })
  })
  .catch(error => {
    console.log(`Error in updating table occupancy ${error}`);
  })
}
// schedule the job to run every hour
const job = schedule.scheduleJob("0 * * * *", () => {
  console.log("Running scheduled job to update occupancy....");
  updateTableOccupancy()
})
// Add a reservation and update the table occupancy
const addReservation = (req, res) => {
  const { userId, restaurantId, tableId, date } = req.body;

  // Checking if the table is already reserved for the given date
  Reservation.findOne({ tableId, date })
    .then((reservationExists) => {
      if (!reservationExists) {
        // Create a new reservation
        Reservation.create({ userId, restaurantId, tableId, date })
          .then((reservation) => {
            // Update the table occupancy
            updateTableOccupancy();
            // Return the created reservation
            res.status(200).json(reservation);
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
