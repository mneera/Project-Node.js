const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema(
  {
    name: String,
    Ref_Number: Number,
  },
  {
    timestamp: true,
  }
);

const Status = mongoose.model("Status", StatusSchema);

module.exports = Status;
