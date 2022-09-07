const Role = require("../models/Role");

const GetRoles = async (req, res) => {
  roless = await Role.find();
  console.log(roless);
  //for the id sent
  res.send(roless);
};

const createRole = async (req, res) => {
  const role = await new Role({
    ...req.body,
  }).save();
  res.send(role);
};

module.exports = {
  createRole,
  GetRoles,
};
