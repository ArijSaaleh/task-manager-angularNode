const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const subTaskModel = require("../Models/subTaskModel");

//Nested routes
exports.setTaskIdToBody = (req, res, next) => {
  if (!req.body.task) req.body.task = req.params.taskId;
  next();
};

// @desc    create a Subtask
// @Route   POST /api/v1/subtasks
// @access  Private
exports.createSubTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, status, task } = req.body;
  const subTask = await subTaskModel.create({
    title,
    slug: slugify(title),
    description,
    dueDate,
    status,
    task,
  });
  res.status(201).json({ data: subTask });
});
// Nested Route
// GET /api/v1/subtasks/:taskId/subtasks
exports.createFilterObject = (req, res, next) => {
  let filterObject;
  if (req.params.taskId) filterObject = { task: req.params.taskId };
  req.filterObject = filterObject;
  next();
};
// @desc    get all Subtasks
// @Route   GET /api/v1/subtasks
// @access  Private
exports.getAllSubtasks = asyncHandler(async (req, res) => {
  const page = 1;
  const limit = 5;
  const skip = (page - 1) * limit; //bch neskipi les doc li deja jbet'hom
  const subtasks = await subTaskModel
    .find(req.filterObject)
    .skip(skip)
    .limit(limit);
  //.populate({ path: "task", select: "title -_id" });
  res.status(200).json({ results: subtasks.length, page, data: subtasks });
});
// @desc    get one subtask by id
// @Route   GET /api/v1/subtasks/:id
// @access  Private
exports.getSubTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subtask = await subTaskModel
    .findById(id)
    .populate({ path: "task", select: "title -_id" });
  if (!subtask) {
    return next(new ApiError(`No Subtask found for the id: ${id}`, 404));
  }
  res.status(200).json({ data: subtask });
});

// @desc    Update one subtask by id
// @Route   PUT /api/v1/subtasks/:id
// @access  Private
exports.updateSubTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, dueDate, status, task } = req.body;
  const subtask = await subTaskModel.findOneAndUpdate(
    { _id: id },
    { title, slug: slugify(title), description, dueDate, status, task },
    { new: true }
  );
  if (!subtask) {
    return next(new ApiError(`No Subtask found for the id: ${id}`, 404));
  }
  res.status(200).json({ data: subtask });
});

// @desc    Delete one subtask by id
// @Route   DEL /api/v1/subtasks/:id
// @access  Private
exports.deleteSubTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subtask = await subTaskModel.findByIdAndDelete(id);
  if (!subtask) {
    return next(new ApiError(`No Subtask found for the id: ${id}`, 404));
  }
  res.status(200).json({ msg: "Subtask Deleted" });
});
