// Types used across the Task Manager app

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt?: string;
  updatedAt?: string;
}
