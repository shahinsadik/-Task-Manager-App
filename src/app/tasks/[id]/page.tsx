"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchTask } from "../../../utils/api";
import type { Task } from "../../../utils/types";
import StatusBadge from "../../../components/StatusBadge";
import dayjs from "dayjs";

export default function ViewTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchTask(id)
      .then(setTask)
      .catch(() => setError("Task not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="max-w-xl mx-auto py-16 text-center text-gray-400">Loading...</div>;
  }
  if (error || !task) {
    return <div className="max-w-xl mx-auto py-16 text-center text-red-500">Task not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <StatusBadge status={task.status} />
      </div>
      <div className="mb-4 text-gray-500 dark:text-gray-400 text-sm">
        Due: {dayjs(task.dueDate).format("MMM D, YYYY")}
      </div>
      <div className="mb-6 text-gray-700 dark:text-gray-200 whitespace-pre-line">
        {task.description}
      </div>
      <div className="flex gap-2 justify-end">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
} 