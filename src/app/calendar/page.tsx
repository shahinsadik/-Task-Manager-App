"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../utils/api";
import type { Task } from "../../utils/types";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import Link from "next/link";
import StatusBadge from "../../components/StatusBadge";
import toast, { Toaster } from "react-hot-toast";
import { BarChart3 } from "lucide-react";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => toast.error("Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  const getDaysInMonth = (date: dayjs.Dayjs) => {
    const start = date.startOf('month');
    const end = date.endOf('month');
    const startDate = start.startOf('week');
    const endDate = end.endOf('week');
    
    const days = [];
    let current = startDate;
    
    while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
      days.push(current);
      current = current.add(1, 'day');
    }
    
    return days;
  };

  const getTasksForDate = (date: dayjs.Dayjs) => {
    return tasks.filter(task => 
      dayjs(task.dueDate).isSame(date, 'day')
    );
  };

  const isToday = (date: dayjs.Dayjs) => {
    return date.isSame(dayjs(), 'day');
  };

  const isCurrentMonth = (date: dayjs.Dayjs) => {
    return date.isSame(currentDate, 'month');
  };

  const days = getDaysInMonth(currentDate);

  const statusColors = {
    completed: "bg-gradient-to-r from-green-400 to-green-600",
    pending: "bg-gradient-to-r from-yellow-400 to-yellow-600",
    "in progress": "bg-gradient-to-r from-blue-400 to-blue-600",
    "not started": "bg-gradient-to-r from-gray-400 to-gray-600"
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-purple-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-3 shadow-lg">
            <CalendarIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Calendar View
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visualize your tasks across time
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/analytics">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform">
              <BarChart3 size={18} />
              Analytics
            </button>
          </Link>
          <Link href="/tasks/new">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-200 hover:shadow-xl">
              <Plus size={20} />
              Add Task
            </button>
          </Link>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
          className="p-3 rounded-xl bg-purple-50 dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
        >
          <ChevronLeft className="w-6 h-6 text-purple-500" />
        </button>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          {currentDate.format('MMMM YYYY')}
        </h2>
        
        <button
          onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
          className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700"
        >
          <ChevronRight className="w-6 h-6 text-purple-500" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-4 text-center font-bold text-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayTasks = getTasksForDate(day);
            const isSelected = selectedDate === day.format('YYYY-MM-DD');
            
            return (
              <div
                key={index}
                className={`min-h-[140px] p-3 border-r border-b border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-200 ${
                  isToday(day) 
                    ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 shadow-inner' 
                    : isSelected
                    ? 'bg-purple-50 dark:bg-purple-900/30 shadow-md'
                    : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 hover:shadow-md'
                } ${!isCurrentMonth(day) ? 'opacity-40' : ''}`}
                onClick={() => setSelectedDate(day.format('YYYY-MM-DD'))}
              >
                {/* Date Number */}
                <div className={`text-lg font-bold mb-2 ${
                  isToday(day) 
                    ? 'text-purple-700 dark:text-purple-200' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {day.format('D')}
                </div>

                {/* Task Indicators */}
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs p-2 rounded-lg truncate ${
                        statusColors[task.status] || 'bg-gradient-to-r from-gray-400 to-gray-600'
                      } text-white font-semibold shadow-sm`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full text-center">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Date Tasks */}
      {selectedDate && (
        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
            Tasks for {dayjs(selectedDate).format('MMMM D, YYYY')}
          </h3>
          
          {getTasksForDate(dayjs(selectedDate)).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📅</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks scheduled for this date.</p>
              <Link href="/tasks/new">
                <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:scale-105 transition-transform">
                  Add Task
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {getTasksForDate(dayjs(selectedDate)).map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl hover:shadow-lg transition-all duration-200 border border-gray-200/50 dark:border-gray-600/50"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">
                      {task.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <StatusBadge status={task.status} />
                    <Link href={`/tasks/${task.id}`}>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-semibold hover:scale-105 transition-transform shadow-md">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl font-bold mb-2">
            {tasks.filter(t => t.status === 'completed').length}
          </div>
          <div className="text-sm opacity-90 font-semibold">Completed Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl font-bold mb-2">
            {tasks.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-sm opacity-90 font-semibold">Pending Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl font-bold mb-2">
            {tasks.filter(t => t.status === 'in progress').length}
          </div>
          <div className="text-sm opacity-90 font-semibold">In Progress</div>
        </div>
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-3xl font-bold mb-2">
            {tasks.filter(t => dayjs(t.dueDate).isSame(dayjs(), 'day')).length}
          </div>
          <div className="text-sm opacity-90 font-semibold">Due Today</div>
        </div>
      </div>
    </div>
  );
} 