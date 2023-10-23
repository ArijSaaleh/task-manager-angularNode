const TaskModel = require("../Models/taskModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc    get list of tasks
// @Route   GET /api/v1/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
  const page = 1;
  const limit = 5;
  const skip = (page - 1) * limit; //bch neskipi les doc li deja jbet'hom
  const tasks = await TaskModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: tasks.length, page, data: tasks });
});
// @desc    get one task by id
// @Route   GET /api/v1/tasks/:id
// @access  Private
exports.getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findById(id);
  if (!task) {
    res.status(404).json({ msg: `No Tasks for this ${id}` });
  }
  res.status(200).json({ data: task });
});
// @desc    create a task
// @Route   POST /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  const task = await TaskModel.create({
    title,
    slug: slugify(title),
    description,
    dueDate,
    priority,
    status,
  });
  res.status(201).json({ data: task });
});

// @desc    Update one task by id
// @Route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status } = req.body;
  const task = await TaskModel.findOneAndUpdate(
    { _id: id },
    { title, slug: slugify(title) },
    { new: true }
  );
  if (!task) {
    res
      .status(404)
      .json({ msg: `No task found to be updated for the id: ${id}` });
  }
  res.status(200).json({ data: task });
});
// @desc    Delete one task by id
// @Route   DEL /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await TaskModel.findByIdAndDelete(id);
  if (!task) {
    res.status(404).json({ msg: "No Task found to delete!" });
  }
  res.status(200).json({ msg: "Task Deleted" });
});
