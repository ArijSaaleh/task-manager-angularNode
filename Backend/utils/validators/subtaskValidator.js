const { check } = require("express-validator");
const validatorMiddleware = require("../../Middleware/validationMiddleware");
// array of rules
exports.getSubTaskValidator = [
  check("id").isMongoId().withMessage("invalid subtask id"),
  validate("id").isMongoId().withMessage,
];

exports.createSubTaskValidator = [
  check("title").isEmpty().withMessage("Title must be included"),
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
