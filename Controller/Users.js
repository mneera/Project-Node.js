const express = require("express");
const mongoose = require("mongoose");
const Users = require("../models/Users");
const Tasks = require("../models/Tasks");
const Performance = require("../models/Performance");

const GetUsers = async (req, res) => {
  Userss = await Users.find().populate(["role", "Tasks"]); ;
  console.log(Userss);
  //for the id sent
  res.send(Userss);
};


const GetOneUser = async (req, res) => {
    const user = await Users.findById(req.params.id).populate(["role", "Tasks"]); ;
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


module.exports = {
  createUsers,
  GetUsers,
  GetOneUser,DeleteUser
};
