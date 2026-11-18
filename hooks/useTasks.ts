import { useEffect, useState } from "react";
import { Task } from "@/types";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks?search=${encodeURIComponent(search)}`);
      const json = await res.json();
      if (json.success) {
        setTasks(json.data);
      } else {
        console.error("Failed to fetch tasks", json.message);
      }
    } catch (err) {
      console.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchTasks();
        return true;
      }
      console.error("Add task failed", json.message);
      return false;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // refetch when search changes
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return {
    tasks,
    loading,
    search,
    setSearch,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}
