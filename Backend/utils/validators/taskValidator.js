const { check } = require("express-validator");
const validatorMiddleware = require("../../Middleware/validationMiddleware");
// array of rules
exports.getTaskValidator = [
  // rule creation
  check("id").isMongoId().withMessage("Invalid task ID"),
  // catch errors from rules if found
  validatorMiddleware,
];

exports.createTaskValidator = [
  check("title")
    .isEmpty()
    .withMessage("Title must be included")
    .isLength({ min: 10 })
    .withMessage("min length 10")
    .isLength({ max: 20 })
    .withMessage("max length 20"),
  validatorMiddleware,
];
exports.updateTaskValidator = [
  // rule creation
  check("id").isMongoId().withMessage("Invalid task ID"),
  // catch errors from rules if found
  validatorMiddleware,
];
exports.deleteTaskValidator = [
  // rule creation
  check("id").isMongoId().withMessage("Invalid task ID"),
  // catch errors from rules if found
  validatorMiddleware,
];
