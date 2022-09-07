const express = require("express");
const RoleController = require("../Controller/Role");
const Router = express.Router();

Router.get("/", RoleController.GetRoles);
Router.post("/add", RoleController.createRole);

module.exports = Router;
