"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../utils/api";
import type { Task, TaskStatus } from "../utils/types";
import TaskRow from "../components/TaskRow";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import ProjectAnalyticsChart from "../components/ProjectAnalyticsChart";
import ProjectProgressDonut from "../components/ProjectProgressDonut";
import RemindersWidget from "../components/RemindersWidget";

const FILTERS = ["all", "pending", "completed"] as const;
type Filter = typeof FILTERS[number];
const SORTS = [
  { value: "dueDate", label: "Due Date" },
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
];

type SortKey = "dueDate" | "title" | "status";

function getStats(tasks: Task[]) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    running: tasks.filter((t) => t.status === "pending").length, // For demo, running = pending
  };
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("dueDate");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  // 1. Filter and sort tasks first
  let filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.status === filter);

  filteredTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sort === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  }).reverse(); // Show last post first

  // 2. Then calculate pagination variables
  const TASKS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const paginatedTasks = filteredTasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

  const stats = getStats(tasks);

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
    <div className="max-w-7xl mx-auto">
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
      {/* Stat Cards and Add Task Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-4">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 backdrop-blur-md shadow-glass border border-white/20 dark:border-white/10 rounded-2xl p-6 flex flex-col items-start">
          <div className="text-3xl font-bold text-purple-700 dark:text-purple-200 drop-shadow">{stats.total}</div>
          <div className="text-sm text-purple-900 dark:text-purple-200 font-medium mt-2">Total Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-purple-300 to-purple-500 backdrop-blur-md shadow-glass border border-white/20 dark:border-white/10 rounded-2xl p-6 flex flex-col items-start">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-200 drop-shadow">{stats.completed}</div>
          <div className="text-sm text-purple-900 dark:text-purple-200 font-medium mt-2">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-purple-200 to-purple-400 backdrop-blur-md shadow-glass border border-white/20 dark:border-white/10 rounded-2xl p-6 flex flex-col items-start">
          <div className="text-3xl font-bold text-purple-500 dark:text-purple-200 drop-shadow">{stats.running}</div>
          <div className="text-sm text-purple-900 dark:text-purple-200 font-medium mt-2">Running</div>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-300 backdrop-blur-md shadow-glass border border-white/20 dark:border-white/10 rounded-2xl p-6 flex flex-col items-start">
          <div className="text-3xl font-bold text-purple-400 dark:text-purple-200 drop-shadow">{stats.pending}</div>
          <div className="text-sm text-purple-900 dark:text-purple-200 font-medium mt-2">Pending</div>
        </div>
      </div>
      {/* Analytics/Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ProjectAnalyticsChart />
        <RemindersWidget />
        <ProjectProgressDonut />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
                filter === f
                  ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white border-purple-600 shadow-lg"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-purple-700 dark:text-purple-200"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <select
            className="ml-4 px-3 py-1 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-purple-700 dark:text-purple-200 text-sm"
            value={sort}
            onChange={e => setSort(e.target.value as SortKey)}
          >
            {SORTS.map(opt => (
              <option key={opt.value} value={opt.value}>{`Sort: ${opt.label}`}</option>
            ))}
          </select>
        </div>
        <Link href="/tasks/new">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition text-sm">
            <PlusCircle size={18} /> Add Task
          </button>
        </Link>
      </div>
      {/* Task Table */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-pastel-purple dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Title</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Due Date</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Status</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Actions</th>
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
