"use client";
import React from "react";
import { Task } from "../utils/types";
import dayjs from "dayjs";
import { BarChart3, TrendingUp, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AnalyticsWidgetProps {
  tasks: Task[];
}

export default function AnalyticsWidget({ tasks }: AnalyticsWidgetProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const overdueTasks = tasks.filter(t => dayjs(t.dueDate).isBefore(dayjs()) && t.status !== 'completed').length;
  
  // Recent performance (last 7 days vs previous 7 days)
  const lastWeekTasks = tasks.filter(t => 
    dayjs(t.dueDate).isAfter(dayjs().subtract(7, 'day')) && 
    dayjs(t.dueDate).isBefore(dayjs())
  );
  const previousWeekTasks = tasks.filter(t => 
    dayjs(t.dueDate).isAfter(dayjs().subtract(14, 'day')) && 
    dayjs(t.dueDate).isBefore(dayjs().subtract(7, 'day'))
  );
  
  const lastWeekCompleted = lastWeekTasks.filter(t => t.status === 'completed').length;
  const previousWeekCompleted = previousWeekTasks.filter(t => t.status === 'completed').length;
  
  const performanceChange = previousWeekCompleted > 0 
    ? ((lastWeekCompleted - previousWeekCompleted) / previousWeekCompleted) * 100 
    : lastWeekCompleted > 0 ? 100 : 0;

  return (
    <div className="shadow-md bg-[rgb(230,215,255)] dark:bg-[rgb(18,16,28)] rounded-2xl shadow p-6 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-2">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Performance Overview</h3>
        </div>
        <Link href="/analytics">
          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {/* Completion Rate */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
          <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Completion Rate</span>
          </div>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            {completionRate.toFixed(1)}%
          </span>
        </div>

        {/* Performance Trend */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">This Week</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${performanceChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {performanceChange >= 0 ? '+' : ''}{performanceChange.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">vs last week</span>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Overdue</span>
          </div>
          <span className="text-lg font-bold text-red-600 dark:text-red-400">
            {overdueTasks}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/analytics">
          <button className="w-full py-2 text-sm font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors">
            View Detailed Analytics →
          </button>
        </Link>
      </div>
    </div>
  );
} 