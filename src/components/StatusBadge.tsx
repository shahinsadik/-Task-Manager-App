import React from "react";
import type { TaskStatus } from "../utils/types";

// You can expand TaskStatus and statusStyles as needed
const statusStyles: Record<string, string> = {
  completed: "bg-green-500 text-white border border-green-500",
  pending: "bg-yellow-400 text-white border border-yellow-400",
  'in progress': "bg-purpleBadgeBg text-purpleBadgeText border border-purpleBadgeBg",
  'not started': "bg-purpleBadgeBg text-purpleBadgeText border border-purpleBadgeBg",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-gray-300 text-gray-700'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  );
} 