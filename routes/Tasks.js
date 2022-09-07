const express = require("express");
const TasksController = require("../Controller/Tasks");
const Router = express.Router();

//router.get('/create', blogController.blog_create_get);
Router.get("/", TasksController.GetTasks);
Router.post("/add", TasksController.createTask);
Router.put("/UpdateStatus/:id", TasksController.updateTaskStatus);
Router.put("/UpdateAssigner/:id", TasksController.GetTaskAssigned);
Router.delete("/:id", TasksController.DeleteTasks);

//router.put('/Tasks/:id', TasksController.createTask);

module.exports = Router;
