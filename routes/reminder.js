const express = require("express");
const authenticate = require("../middleware/auth");
const {
  getAllReminders,
  createReminder,
  getReminderById,
  deleteReminder,
  updateReminder,
} = require("../controllers/reminder");

const reminderRoute = express.Router();

reminderRoute.get("/api/reminders", authenticate, getAllReminders); // get all

reminderRoute.get("/api/reminders/:id", authenticate, getReminderById); // get single one

reminderRoute.post("/api/reminders", authenticate, createReminder); // create

reminderRoute.delete("/api/reminders/:id", authenticate, deleteReminder); // delete a reminder by id

reminderRoute.patch("/api/reminders/:id", authenticate, updateReminder);

module.exports = { reminderRoute };
