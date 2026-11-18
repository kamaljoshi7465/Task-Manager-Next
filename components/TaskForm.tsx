import { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<boolean>;
  loading: boolean;
}

export default function TaskForm({ onSubmit, loading }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const success = await onSubmit(title, description);
    if (success) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3 rounded-xl bg-white p-5 shadow">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-3"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
  );
}
