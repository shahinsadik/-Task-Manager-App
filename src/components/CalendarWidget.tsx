"use client";
import React from "react";
import { Task } from "../utils/types";
import dayjs from "dayjs";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

interface CalendarWidgetProps {
  tasks: Task[];
}

export default function CalendarWidget({ tasks }: CalendarWidgetProps) {
  // Get upcoming tasks (next 7 days)
  const upcomingTasks = tasks
    .filter(task => {
      const taskDate = dayjs(task.dueDate);
      const today = dayjs();
      const nextWeek = today.add(7, 'day');
      return taskDate.isAfter(today) && taskDate.isBefore(nextWeek);
    })
    .sort((a, b) => dayjs(a.dueDate).diff(dayjs(b.dueDate)))
    .slice(0, 5);

  const statusColors = {
    completed: "bg-green-500",
    pending: "bg-yellow-500",
    "in progress": "bg-blue-500",
    "not started": "bg-gray-500"
  };

  return (
    <div className="shadow-md bg-[rgb(230,215,255)] dark:bg-[rgb(18,16,28)] rounded-2xl shadow p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg p-2">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Upcoming Tasks</h3>
        </div>
        <Link href="/calendar">
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">📅</div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming tasks</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingTasks.map(task => {
            const daysUntil = dayjs(task.dueDate).diff(dayjs(), 'day');
            const isToday = daysUntil === 0;
            const isTomorrow = daysUntil === 1;
            
            let timeText = '';
            if (isToday) timeText = 'Today';
            else if (isTomorrow) timeText = 'Tomorrow';
            else timeText = `${daysUntil} days`;

            return (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200/50 dark:border-gray-600/50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-2 h-2 rounded-full ${statusColors[task.status] || 'bg-gray-500'}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {timeText}
                      </span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={task.status} />
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/calendar">
          <button className="w-full py-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
            View Full Calendar →
          </button>
        </Link>
      </div>
    </div>
  );
} 