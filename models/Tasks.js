const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = require("./Users");

const TasksSchema = new Schema(
  {
    Title: String,
    Deadline: Date,
    Description: String,
    AssignedDate: Date,
    CompletedDate: Date,
    Point: Number,
    Status: { type: Schema.Types.ObjectId, ref: "Status" },
    assigned: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    
    comments: [
      {
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        content: String,
      },
    ],
  },
  {
    timestamp: true,
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, 'i') });
      }}
  }
);

const Tasks = mongoose.model("Tasks", TasksSchema);

module.exports = Tasks;
