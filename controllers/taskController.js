const taskModel = require("../models/task");

//create task
exports.createTask = (req, res) => {
  let payload = req.body;
  // create task_no
  taskModel.countDocuments({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let taskNo = "";
      let date = new Date();
      let year = date.getFullYear().toString().substr(-2);
      taskNo = `RTASK${year}${result.toString().padStart(3, "0")}`;
      // console.log(taskNo)
      payload.task_no = taskNo;
      //console.log(payload);
      taskModel
        .create(payload)
        .then((task) => {
          if (task) {
            return res
              .status(200)
              .json({
                status: "200",
                message: "Successfully added Task",
                task,
              });
          }
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ status: "400", error: "Unable to save user to DB", err });
        });
    }
  });
};
//task list
exports.getTask = (req, res) => {
  taskModel.find((err, docs) => {
    if (!err) {
      return res
        .status(200)
        .json({ status: "200", message: "Task List", docs });
    } else {
      return res
        .status(400)
        .json({
          status: "400",
          error: "Failed to retrieve the task List",
          err,
        });
    }
  });
};
//task edit
exports.editTask = (req, res) => {
  const condition = { _id: req.params.id };
  taskModel
    .updateOne(condition, req.body)
    .then((docs) => {
      if (!docs) {
        return res
          .status(400)
          .send({ status: "400", error: "Failed to Update" });
      }
      return res
        .status(200)
        .send({ status: "200", message: "Succesffully Updated Task" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};
