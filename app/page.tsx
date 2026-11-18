"use client";

import useTasks from "@/hooks/useTasks";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  const {
    tasks,
    loading,
    search,
    setSearch,
    addTask,
    toggleTask,
    deleteTask,
    fetchTasks,
  } = useTasks();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Task Manager</h1>
        <p className="mb-6 text-gray-600">Manage your daily tasks</p>

        <TaskForm onSubmit={addTask} loading={loading} />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded border bg-white p-3"
        />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </main>
  );
}