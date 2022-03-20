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
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: mongoose.SchemaTypes.Mixed,
  },
});

module.exports = mongoose.model("file", FileSchema);
