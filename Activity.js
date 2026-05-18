const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    domain: String,
    timeSpent: Number,
    date: Date
});

module.exports = mongoose.model("Activity", ActivitySchema);
