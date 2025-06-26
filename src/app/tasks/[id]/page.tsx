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
    return <div className="max-w-xl mx-auto py-16 text-center text-purpleAccent/50">Loading...</div>;
  }
  if (error || !task) {
    return <div className="max-w-xl mx-auto py-16 text-center text-danger">Task not found.</div>;
  }

  return (
    <div className="max-w-full shadow-lg mx-auto bg-purpleCard dark:bg-purpleDeep rounded-2xl shadow-glass p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purpleAccent">{task.title}</h1>
        <StatusBadge status={task.status} />
      </div>
      <div className="mb-4 text-sm text-purpleAccentDark dark:text-purpleAccent/70">
        Due: {dayjs(task.dueDate).format("MMM D, YYYY")}
      </div>
      <div className="mb-6 text-gray-800 bg-purple-200 p-5 rounded-l-lg rounded-r-lg shadow-md dark:text-gray-200 whitespace-pre-line">
        {task.description}
      </div>
      <div className="flex gap-2 justify-end">
        <button
         className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition text-sm"
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
        >
          Edit
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition text-sm"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
