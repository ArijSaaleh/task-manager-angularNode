const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    task: {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
      required: [true, "Sub task must belong to a main task"],
    },
  },
  { timestamps: true }
);

const subtaskModel = new mongoose.model("subtaskModel", subTaskSchema);
module.exports = subtaskModel;
