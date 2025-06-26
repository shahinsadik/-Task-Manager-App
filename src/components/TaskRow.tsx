"use client";

import React from "react";
import dayjs from "dayjs";
import StatusBadge from "./StatusBadge";
import type { Task, TaskStatus } from "../utils/types";
import Link from "next/link";
import { CheckCircle2, Clock, Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { updateTask } from "../utils/api";
import toast from "react-hot-toast";
import { statusStyles } from "./StatusBadge";

// Status icon colors
const statusIconColor: Record<string, string> = {
  completed: "text-[rgb(128,90,213)]",      // purpleAccent
  pending: "text-yellow-400",
  "in progress": "text-cyan-400",
  "not started": "text-gray-400",
};

interface TaskRowProps {
  task: Task;
  onDelete: (id: string) => void;
  index: number;
}

const statusOptions: TaskStatus[] = ["pending", "completed", "in progress", "not started"];

export default function TaskRow({ task, onDelete, index }: TaskRowProps) {
  const iconColor = statusIconColor[task.status] || "text-gray-400";
  const [status, setStatus] = React.useState<TaskStatus>(task.status);
  const [updating, setUpdating] = React.useState(false);

  const statusIcon =
    status === "completed" ? (
      <CheckCircle2 className={iconColor} size={20} />
    ) : (
      <Clock className={iconColor} size={20} />
    );

  // Alternating row background (light/dark mode supported)
  const rowBg =
    index % 2 === 0
      ? "bg-[rgb(245,240,255)] dark:bg-[rgb(18,16,28)]"
      : "bg-[rgb(230,215,255)]/50 dark:bg-gray-800";

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus;
    setUpdating(true);
    try {
      await updateTask(task.id, { status: newStatus });
      setStatus(newStatus);
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={`${rowBg} border-b border-gray-200 dark:border-gray-800`}
    >
      <td className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
        {statusIcon}
        <span className="text-purpleAccent text-sm ">{task.title}</span>
      </td>

      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
        {dayjs(task.dueDate).format("MMM D, YYYY")}
      </td>

      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
            className={`ml-2 px-2 py-1 rounded text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purpleAccent/50 transition ${statusStyles[status] || 'bg-gray-300 text-gray-700'}`}
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </td>

      <td className="px-4 py-2">
        <div className="flex gap-2 items-center">
          
          <Link href={`/tasks/${task.id}/edit`} title="Edit">
            <Pencil
              className="text-[rgb(34,197,94)] hover:bg-[rgb(34,197,94)]/20 rounded p-1 transition cursor-pointer"
              size={28}
            />
          </Link>
          <button onClick={() => onDelete(task.id)} title="Delete">
            <Trash2
              className="text-[rgb(244,63,94)] hover:bg-[rgb(244,63,94)]/20 rounded p-1 transition cursor-pointer"
              size={28}
            />
          </button>
        </div>
      </td>
      <td className="px-4 py-2">
      <Link href={`/tasks/${task.id}`} title="View" className="text-[rgb(99,102,241)] hover:bg-[rgb(99,102,241)]/20 rounded p-1 transition cursor-pointer text-sm font-bold">
             View
          </Link>
      </td>
    </motion.tr>
  );
}
