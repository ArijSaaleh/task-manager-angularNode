const { check } = require("express-validator");
const validatorMiddleware = require("../../Middleware/validationMiddleware");
// array of rules
exports.getSubTaskValidator = [
  check("id")
    .isMongoId()
    .withMessage("invalid subtask id")
    .not()
    .isEmpty()
    .withMessage("no id provided"),
  validatorMiddleware,
];

exports.createSubTaskValidator = [
  check("title").not().isEmpty().withMessage("Title must be specified"),
  check("task")
    .isMongoId()
    .withMessage("Invalid task id format")
    .notEmpty()
    .withMessage("subTask must belog to a main task"),
  validatorMiddleware,
];
exports.updateSubTaskValidator = [
  // rule creation
  check("id").isMongoId().withMessage("Invalid Subtask ID"),
  // catch errors from rules if found
  validatorMiddleware,
];
exports.deleteSubTaskValidator = [
  // rule creation
  check("id").isMongoId().withMessage("Invalid Subtask ID"),
  // catch errors from rules if found
  validatorMiddleware,
];
