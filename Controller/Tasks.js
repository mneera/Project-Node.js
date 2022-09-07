const Tasks = require("../models/Tasks");
const Status = require("../models/Status");
const Users = require("../models/Users");

const GetTasks = async (req, res) => {
  Taskss = await Tasks.find().populate(["assigned", "Status"]);
  console.log(Taskss);

  res.send(Taskss);
};

const createTask = async (req, res) => {
  Task = await new Tasks({
    ...req.body,
  }).save();

  user = await Users.findByIdAndUpdate(
    { _id: req.body.assigned },
    { Task: Task._id }
  ).populate(["Tasks"]);
  res.send(Task);
};

//Update the status of the Tasks
const updateTaskStatus = async (req, res) => {
  newStatus = await Status.findOne({ name: req.body.status });
  TaskDetails = await Tasks.findOne({ _id: req.params.id }); //.populate(["assigned", "Status"]);
  const Deadline = TaskDetails.Deadline;
  const CompletedDate = TaskDetails.CompletedDate;
  console.log(`Deadline: ${Deadline} | CompletedDate: ${CompletedDate} `);

  //check if the update is Complete
  if (req.body.status == "Completed") {
    update = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { Status: newStatus._id, CompletedDate: Date.now() }
    );

    //to check if the task completed on time or not and set the Points
    if (Deadline.getTime() > CompletedDate.getTime()) {
      console.log(
        `Deadline (${Deadline}) is greater than Completed Date (${CompletedDate})`
      );
      update = await Tasks.findByIdAndUpdate(
        { _id: req.params.id },
        { Point: 3 }
      );
      res.send(`The Task completed at ${TaskDetails.CompletedDate}
      You get ${TaskDetails.Point} point, as the Task complete before the deadline`);
    } else if (Deadline.getTime() == CompletedDate.getTime()) {
      update = await Tasks.findByIdAndUpdate(
        { _id: req.params.id },
        { Point: 1 }
      );
      res.send(
        `The Task completed at ${TaskDetails.CompletedDate}
        You get ${TaskDetails.Point} point, as the Task complete on time`,
        TaskDetails
      );
    } else {
      update = await Tasks.findByIdAndUpdate(
        { _id: req.params.id },
        { Point: 0 }
      );
      res.send(`The Task completed at ${TaskDetails.CompletedDate}
    You get ${TaskDetails.Point} point, as the Task complete after the deadline`);
    }
  } else {
    update = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { Status: newStatus._id }
    );

    // res.send(`Updated task: ${newStatus.name}`);
    res.send(TaskDetails);
  }
};

//get the users responsible for the task
const UpdateTaskAssigned = async (req, res) => {
  TaskDetails = await Tasks.findOne({ _id: req.params.id });
  newAssigned = await Users.findOne({ _id: req.body.id });

  updateUsers = await Tasks.findByIdAndUpdate(
    { _id: req.params.id },
    { assigned: newAssigned._id }
  );

  res.send(`The updated task assigner: ${newAssigned.Name}`);
};

const DeleteTasks = async (req, res) => {
  const id = req.params.id;

  deleteTask = await Tasks.findByIdAndDelete(id);
  //NEW
  TaskinUsers = await Users.findOne(id.assigned);
  deleteTask = await Users.findByIdAndDelete(TaskinUsers.Tasks);

  res.send(`The task ID: ${id} Deleted`);
};

module.exports = {
  updateTaskStatus,
  createTask,
  GetTasks,
  DeleteTasks,
  UpdateTaskAssigned,
};
