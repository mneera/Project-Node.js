const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Tasks = require("./Tasks");
const Role = require("./Role");

const UsersSchema = new Schema(
  {
    UserName: String,
    password: String,
    Name: String,
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    email:  String,
    
    Tasks: [
      {
        Task: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
        marks: Number,
      },
    ],
  },
  {
    timestamp: true, 
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, 'i') });
      }
  } 
}
);

// UsersSchema.static("findByName", function (Name) {
//   return this.find({ Name: Name });
// });

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
