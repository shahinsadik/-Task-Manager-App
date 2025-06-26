import React from "react";
import type { TaskStatus } from "../utils/types";

const statusStyles: Record<TaskStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  );
} 