"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../utils/api";
import type { Task, TaskStatus } from "../utils/types";
import TaskRow from "../components/TaskRow";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";

const FILTERS = ["all", "pending", "completed"] as const;
type Filter = typeof FILTERS[number];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleting(true);
    try {
      await deleteTask(deletingId);
      setTasks((prev) => prev.filter((t) => t.id !== deletingId));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <Modal
        open={!!deletingId}
        title="Delete Task?"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeletingId(null)}
        loading={deleting}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? "bg-accent text-white border-accent"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4 text-gray-500 dark:text-gray-400 text-sm">
        {completedCount} done / {tasks.length} total
      </div>
      <div className="overflow-x-auto rounded-2xl shadow-md bg-white dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-red-500">{error}</td>
              </tr>
            ) : filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">No tasks found.</td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <TaskRow key={task.id} task={task} onDelete={handleDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
