import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

      dueDate: {
        type: Date,
        default: null,
      },
    },
  {
    timestamps: true,
  }
);

const Task =
  mongoose.models.Task ||
  mongoose.model("Task", taskSchema);

export default Task;