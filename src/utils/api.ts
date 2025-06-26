import { Task } from "./types";

const API_URL = "https://685bbc9189952852c2dac199.mockapi.io/api/v1/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function fetchTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Task not found");
  return res.json();
}

export async function createTask(data: Omit<Task, "id">): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
} 