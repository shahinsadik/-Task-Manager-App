import React from "react";
import dayjs from "dayjs";
import StatusBadge from "./StatusBadge";
import type { Task } from "../utils/types";
import Link from "next/link";
import { CheckCircle2, Clock, Eye, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskRowProps {
  task: Task;
  onDelete: (id: string) => void;
  index: number;
}

const statusIconColor: Record<string, string> = {
  completed: "text-blue-500",
  pending: "text-yellow-400",
  "in progress": "text-green-500",
  "not started": "text-gray-400",
};

export default function TaskRow({ task, onDelete, index }: TaskRowProps) {
  const iconColor = statusIconColor[task.status] || "text-gray-400";
  const statusIcon =
    task.status === "completed" ? (
      <CheckCircle2 className={iconColor} size={20} />
    ) : (
      <Clock className={iconColor} size={20} />
    );

  // Alternate row background
  const rowBg = index % 2 === 0
    ? "bg-white dark:bg-gray-900"
    : "bg-pastel-purple/40 dark:bg-gray-800";

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
        <span>{task.title}</span>
      </td>
      <td className="px-4 py-2 text-gray-700 dark:text-gray-300">
        {dayjs(task.dueDate).format("MMM D, YYYY")}
      </td>
      <td className="px-4 py-2">
        <StatusBadge status={task.status} />
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-2 items-center">
          <Link href={`/tasks/${task.id}`} title="View">
            <Eye className="text-pastel-blue hover:bg-pastel-blue/40 rounded p-1 transition cursor-pointer" size={28} />
          </Link>
          <Link href={`/tasks/${task.id}/edit`} title="Edit">
            <Pencil className="text-pastel-green hover:bg-pastel-green/40 rounded p-1 transition cursor-pointer" size={28} />
          </Link>
          <button onClick={() => onDelete(task.id)} title="Delete">
            <Trash2 className="text-pastel-pink hover:bg-pastel-pink/40 rounded p-1 transition cursor-pointer" size={28} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
} 