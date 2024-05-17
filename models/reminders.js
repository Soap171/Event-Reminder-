const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  reminderDate: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Reminder", reminderSchema);
