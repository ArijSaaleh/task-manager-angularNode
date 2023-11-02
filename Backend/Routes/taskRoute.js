const express = require("express");
const router = express.Router();

const taskService = require("../Services/taskService");
const taskValidator = require("../utils/validators/taskValidator");

//router.post("/", taskService.addTask);
router
  .route("/")
  .get(taskService.getTasks)
  .post(taskValidator.createTaskValidator, taskService.createTask);

router
  .route("/:id")
  .get(taskValidator.getTaskValidator, taskService.getTaskById)
  .put(taskValidator.updateTaskValidator, taskService.updateTask)
  .delete(taskValidator.deleteTaskValidator, taskService.deleteTask);
module.exports = router;
