const Status = require("../models/Status");

const GetStatus = async (req, res) => {
    Statuss = await Status.find();
  console.log(Statuss);

  res.send(Statuss);
};

const createStatus = async (req, res) => {
  const newStatus = await new Status({
    ...req.body,
  }).save();
  res.send(newStatus);
};

module.exports = {
    createStatus,
    GetStatus,
};