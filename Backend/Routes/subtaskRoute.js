const express = require("express");
const router = express.Router();

const subTaskService = require("../Services/subtaskService");
const subtaskValidator = require("../utils/validators/subtaskValidator");

router
  .route("/")
  .post(subtaskValidator.createSubTaskValidator, subTaskService.createSubTask);

router
  .route("/:id")
  .get(subtaskValidator.getSubTaskValidator, subTaskService.getSubTaskById);
//.put(subtaskValidator.updateSubTask, subTaskService.updateSubTask)
//.delete(subtaskValidator.deleteSubTask, subTaskService.deleteSubTask);

module.exports = router;
