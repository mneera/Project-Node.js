const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    email: String,
    password: String,
    Name: String,
    role: { type: Schema.Types.ObjectId, ref: "Role" },

    Tasks: [
      {
        Task: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
        Disabled: {
          type: Boolean,
          default: "No",
        },
      },
    ],
  },
  {
    timestamp: true,
    statics: {
      findByName(name) {
        return this.find({ name: new RegExp(name, "i") });
      },
    },
  }
);

// UsersSchema.static("findByName", function (Name) {
// return this.find({ Name: Name });
// });

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
