const express = require("express");
const router = express.Router();

const subTaskService = require("../Services/subtaskService");
const subtaskValidator = require("../Services/subtaskValidator");
router.route("/").post(subTaskService.createSubTask);

router
  .route("/:id")
  .get(subtaskValidator.getSubTaskValidator, subTaskService.getSubTaskById)
  .put(subtaskValidator.updateSubTask, subtaskService.updateSubTask)
  .delete(subtaskValidator.deleteSubTask, subtaskService.deleteSubTask);

module.exports = router;
