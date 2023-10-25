const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be included"],
      minlength: [10, "too short"],
      maxlength: [20, "too long"],
    }, //  A  and B (ay haja feha espace => api/a-and-b)
    slug: {
      type: String,
      lowercase: true,
    },
    description: String,
    dueDate: Date,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for task assignment
    },
  },
  { timestamps: true }
);
// create model from the schema
const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
