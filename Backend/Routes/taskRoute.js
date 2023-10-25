const express = require("express");
const router = express.Router();
const { param, validationResult } = require("express-validator");

const taskService = require("../Services/taskService");

//router.post("/", taskService.addTask);
router.route("/").get(taskService.getTasks).post(taskService.createTask);
router
  .route("/:id")
  .get(
    // rule creation
    param("id").isMongoId().withMessage("Invalid task ID"),
    // catch errors from rules if found
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.send({ errors: errors.array() });
      }
    },
    taskService.getTaskById
  )
  .put(
    param("id").isMongoId().withMessage("Invalid ID"),
    taskService.updateTask
  )
  .delete(
    param("id").isMongoId().withMessage("Invalid ID"),
    taskService.deleteTask
  );
module.exports = router;
