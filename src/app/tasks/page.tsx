"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../../utils/api";
import type { Task, TaskStatus } from "../../utils/types";
import TaskRow from "../../components/TaskRow";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import { AnimatePresence } from "framer-motion";

const FILTERS: (TaskStatus | "all")[] = ["all", "pending", "completed", "in progress", "not started"];
const filterColors: Record<string, string> = {
  all: "bg-accent text-white border-accent",
  pending: "bg-yellow-400 text-white border-yellow-400",
  completed: "bg-green-500 text-white border-green-500",
  "in progress": "bg-green-400 text-white border-green-400",
  "not started": "bg-gray-400 text-white border-gray-400",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const TASKS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  let filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  const pageCount = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="max-w-5xl bg-purpleBg mx-auto mt-8 shadow-lg p-5">
      <Toaster position="top-right" />
      <div className="text-2xl font-bold mb-6">All Tasks</div>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              filter === f
                ? filterColors[f]
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => { setFilter(f); setPage(1); }}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-purple-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Title</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Due Date</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Actions</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}><Loader /></td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-red-500">{error}</td>
              </tr>
            ) : paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-400">No tasks found.</td>
              </tr>
            ) : (
              <AnimatePresence>
                {paginatedTasks.map((task, idx) => (
                  <TaskRow key={task.id} task={task} onDelete={handleDelete} index={(page - 1) * TASKS_PER_PAGE + idx} />
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-sm">
          <div>
            Showing {(page - 1) * TASKS_PER_PAGE + 1} to {Math.min(page * TASKS_PER_PAGE, filteredTasks.length)} of {filteredTasks.length} entries
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-pastel-purple text-accent'}`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-accent text-white' : 'bg-pastel-purple text-accent'}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded ${page === pageCount || pageCount === 0 ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-pastel-purple text-accent'}`}
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount || pageCount === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 