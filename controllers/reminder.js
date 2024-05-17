const mongoose = require("mongoose");
const Reminder = require("../models/reminders");

// Get all Reminder belongs to the user
const getAllReminders = async (req, res) => {
  try {
    const userId = req.user.id;

    const reminders = await Reminder.find({ user: userId });

    if (!reminders) return res.status(404).json("No reminder for you");

    res.status(200).json(reminders);
  } catch (err) {
    console.log(err);
  }
};

// Create a new Reminder
const createReminder = async (req, res) => {
  try {
    const { title, description, reminderDate } = req.body;
    const userId = req.user.id;

    const newReminder = new Reminder({
      title,
      description,
      reminderDate,
      user: userId,
    });

    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single Reminder by an id
const getReminderById = async (req, res) => {
  try {
    const reminderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reminderId))
      return res.status(400).json("Invalid ID");

    const reminder = await Reminder.findById(reminderId);

    if (!reminder) return res.status(404).json("Reminder not found");

    res.status(200).json(reminder);
  } catch (err) {
    console.log(err);
  }
};

// delete a reminder using the id

const deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reminderId))
      return res.status(400).json("Invalid ID");

    const reminder = await Reminder.findOneAndDelete({ _id: reminderId });
    if (!reminder) return res.status(404).json("Reminder not found");

    res.status(200).json("Reminder successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

// update a reminder by using the id
const updateReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;

    console.log(req.body);

    if (!mongoose.Types.ObjectId.isValid(reminderId))
      return res.status(400).json("Invalid Id");

    const updatedReminder = await Reminder.findOneAndUpdate(
      { _id: reminderId },

      req.body,
      { new: true }
    );

    if (!updateReminder) return res.status9(404).json("Reminder not found");

    res.status(200).json("Reminder succesfully updated");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllReminders,
  createReminder,
  getReminderById,
  deleteReminder,
  updateReminder,
};
