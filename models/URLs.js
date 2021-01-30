const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  lastAccesed: {
    type: String,
    required: true,
    default: "Never accesed yet",
  },
});

module.exports = mongoose.model("URLs", schema);
