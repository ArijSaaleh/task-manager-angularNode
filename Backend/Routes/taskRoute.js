const express = require("express");
const router = express.Router();
const taskService = require("../Services/taskService");

//router.post("/", taskService.addTask);
router.route("/").get(taskService.getTasks).post(taskService.createTask);
router
  .route("/:id")
  .get(taskService.getTaskById)
  .put(taskService.updateTask)
  .delete(taskService.deleteTask);
module.exports = router;
