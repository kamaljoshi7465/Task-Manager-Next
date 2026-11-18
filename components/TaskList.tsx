import { Task } from "@/types";
import React from "react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="rounded bg-white p-4 text-gray-500">No tasks found.</p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow"
        >
          <div>
            <h2
              className={`font-semibold ${
                task.status === "completed" ? "text-gray-400 line-through" : ""
              }`}
            >
              {task.title}
            </h2>
            {task.description && (
              <p className="text-sm text-gray-500">{task.description}</p>
            )}
            <p className="mt-1 text-xs">Status: {task.status}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onToggle(task)}
              className="rounded bg-green-600 px-3 py-2 text-sm text-white"
            >
              {task.status === "completed" ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="rounded bg-red-600 px-3 py-2 text-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
