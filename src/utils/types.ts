export type TaskStatus = "pending" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO string
  createdAt?: string;
  updatedAt?: string;
} 