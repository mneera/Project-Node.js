const Tasks = require("../models/Tasks");
const Status = require("../models/Status");
const Users = require("../models/Users");
//const Performance = require("../models/Performance")

const GetTasks = async (req, res) => {
  Taskss = await Tasks.find().populate(["assigned", "Status"]);  ;
  console.log(Taskss);

  res.send(Taskss);
};

const createTask = async (req, res) => {
  Task = await new Tasks({
    ...req.body,
  }).save();

  res.send(Task);
};

const updateTaskStatus = async (req, res) => {
  newStatus = await Status.findOne({ name: req.body.status });
  TaskDetails = await Tasks.findOne({ _id: req.params.id });
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
      console.log(`Deadline (${Deadline}) is greater than Completed Date (${CompletedDate})` );
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
      res.send(`The Task completed at ${TaskDetails.CompletedDate}
        You get ${TaskDetails.Point} point, as the Task complete on time`);
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

    res.send(`Updated task: ${newStatus.name}`);
  }
};



const GetTaskAssigned = async (req, res) => {
    //TaskDetails = await Tasks.findOne({ _id: req.params.id });

    newAssigned = await Users.findOne({ _id : req.body.id });
    update = await Tasks.findByIdAndUpdate(
      { _id: req.params.id },
      { assigned: newAssigned._id });

    res.send(`The updated task assigner: ${newAssigned.Name}`);
  
};

const DeleteTasks = async (req, res) => {
  const id = req.params.id;
  
  deleteTask = await Tasks.findByIdAndDelete(id);

  res.send(`The task ID: ${id} Deleted`);
 };


module.exports = {
  updateTaskStatus,
  createTask,
  GetTasks,
  DeleteTasks,
  GetTaskAssigned
};
