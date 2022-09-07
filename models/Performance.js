const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Tasks = require("./Tasks");

const PerformanceSchema = new Schema(
  {
    point: String,
    Tasks: { type: Schema.Types.ObjectId, ref: "Tasks" },
  },
  {
    timestamp: true,
  }
);

const Performance = mongoose.model("Performance", PerformanceSchema);

module.exports = Performance;
