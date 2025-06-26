import React from "react";
import dayjs from "dayjs";
import StatusBadge from "./StatusBadge";
import type { Task } from "../utils/types";
import Link from "next/link";

interface TaskRowProps {
  task: Task;
  onDelete: (id: string) => void;
}

export default function TaskRow({ task, onDelete }: TaskRowProps) {
  return (
    <tr className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{task.title}</td>
      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{dayjs(task.dueDate).format("MMM D, YYYY")}</td>
      <td className="px-4 py-3"><StatusBadge status={task.status} /></td>
      <td className="px-4 py-3 flex gap-2">
        <Link href={`/tasks/${task.id}`} className="text-accent hover:underline text-sm">View</Link>
        <Link href={`/tasks/${task.id}/edit`} className="text-blue-500 hover:underline text-sm">Edit</Link>
        <button onClick={() => onDelete(task.id)} className="text-red-500 hover:underline text-sm">Delete</button>
      </td>
    </tr>
  );
} 