const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./Users");

const RoleSchema = new Schema(
  {
    name: String,
  },
  {
    timestamp: true,
  }
);

const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;
