const express = require("express");
const StatusController = require("../Controller/Status");
const Router = express.Router();

Router.get("/", StatusController.GetStatus);
Router.post("/add", StatusController.createStatus);

module.exports = Router;