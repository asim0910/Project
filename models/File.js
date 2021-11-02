const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  doc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("file", FileSchema);
