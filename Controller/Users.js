const express = require("express");
const joi = require("joi");
const Users = require("../models/Users");
const Tasks = require("../models/Tasks");
const Performance = require("../models/Performance");

const GetUsers = async (req, res) => {
  Userss = await Users.find().populate(["role", "Tasks"]);
  console.log(Userss);

  res.send(Userss);
};

const GetOneUser = async (req, res) => {
  const user = await Users.findById(req.params.id).populate(["Tasks", "role"]);
  res.send(user);
};

const createUsers = async (req, res) => {
  user = await new Users({
    ...req.body,
  }).save();

  res.send(user);
};

const DeleteUser = async (req, res) => {
  const id = req.params.id;

  deleteusers = await Users.findByIdAndDelete(id);

  res.send(`The user ID: ${id} Deleted`);
};

const login = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        email: joi.string().email().required(),

        password: joi.string().required(),
      })
      .options({ stripUnknown: true });

    schema.validate(req.body);

    let userEmail = await Users.findOne({
      email: req.body.email,
    });

    let userPass = await Users.findOne({
      password: req.body.password,
    });

    if (!userEmail || !userPass) {
      res.status(403).json({ message: "The password or email incorrect" });
      return;
    }

    res.json({
      status: "logged in",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

module.exports = {
  createUsers,
  GetUsers,
  GetOneUser,
  DeleteUser,
  login,
};
