"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  async function fetchTasks() {
    try {
      const response = await fetch(
        `/api/tasks?search=${encodeURIComponent(search)}`
      );

      const result = await response.json();

      if (result.success) {
        setTasks(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  // Fetch tasks when search changes
  useEffect(() => {
    fetchTasks();
  }, [search]);

  // Create task
  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTitle("");
        setDescription("");
        await fetchTasks();
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setLoading(false);
    }
  }

  // Toggle task status
  async function toggleTask(task) {
    const newStatus =
      task.status === "completed"
        ? "pending"
        : "completed";

    await fetch(`/api/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    await fetchTasks();
  }

  // Delete task
  async function deleteTask(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    await fetchTasks();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">

        <h1 className="mb-2 text-3xl font-bold">
          Task Manager
        </h1>

        <p className="mb-6 text-gray-600">
          Manage your daily tasks
        </p>

        {/* Create Task Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-3 rounded-xl bg-white p-5 shadow"
        >
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-3"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded border bg-white p-3"
        />

        {/* Task List */}
        <div className="space-y-3">

          {tasks.length === 0 && (
            <p className="rounded bg-white p-4 text-gray-500">
              No tasks found.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow"
            >
              <div>
                <h2
                  className={`font-semibold ${task.status === "completed"
                      ? "text-gray-400 line-through"
                      : ""
                    }`}
                >
                  {task.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {task.description}
                </p>

                <p className="mt-1 text-xs">
                  Status: {task.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task)}
                  className="rounded bg-green-600 px-3 py-2 text-sm text-white"
                >
                  {task.status === "completed"
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="rounded bg-red-600 px-3 py-2 text-sm text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}