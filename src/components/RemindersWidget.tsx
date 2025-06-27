
import React from "react";
import { CalendarCheck2 } from "lucide-react";

export default function RemindersWidget() {
  return (
    <div className="shadow-md bg-[rgb(230,215,255)] dark:bg-[rgb(18,16,28)] rounded-2xl shadow p-6 flex flex-col justify-between h-full">
      <div className="flex items-center gap-3 mb-4">
        <CalendarCheck2 className="text-[rgb(128,90,213)]" size={28} />
        <div className="font-semibold text-gray-800 dark:text-gray-100">
          Reminders
        </div>
      </div>

      <div className="mb-2">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Meeting with Arc Company
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Time: 02:00 pm - 04:00 pm
        </div>
      </div>

      <button className="mt-4 px-4 py-2 rounded-full bg-[rgb(128,90,213)] hover:bg-[rgb(107,70,193)] text-white font-semibold text-sm shadow transition">
        Start Meeting
      </button>
    </div>
  );
}
