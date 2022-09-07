const express = require("express");
const Router = express.Router();
const UsersController = require("../controller/Users")

Router.post('/add', UsersController.createUsers);
Router.post('/login', UsersController.login);
Router.get('/', UsersController.GetUsers); 
Router.get('/:id', UsersController.GetOneUser); 
Router.delete('/:id', UsersController.DeleteUser); 


module.exports = Router;