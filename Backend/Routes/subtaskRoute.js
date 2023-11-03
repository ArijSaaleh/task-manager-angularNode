const express = require("express");
//mergeParams allows us to access parameters of another routers
// ex we need to access the task ID from the task route
const router = express.Router({ mergeParams: true });

const subTaskService = require("../Services/subtaskService");
const subtaskValidator = require("../utils/validators/subtaskValidator");

router
  .route("/")
  .get(subTaskService.getAllSubtasks)
  .post(subtaskValidator.createSubTaskValidator, subTaskService.createSubTask);

router
  .route("/:id")
  .get(subtaskValidator.getSubTaskValidator, subTaskService.getSubTaskById)
  .put(subtaskValidator.updateSubTaskValidator, subTaskService.updateSubTask)
  .delete(
    subtaskValidator.deleteSubTaskValidator,
    subTaskService.deleteSubTask
  );

module.exports = router;
