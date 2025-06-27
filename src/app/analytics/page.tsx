"use client";
import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../utils/api";
import type { Task } from "../../utils/types";
import dayjs from "dayjs";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Activity,
  PieChart,
  LineChart
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function AnalyticsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then(setTasks)
      .catch(() => toast.error("Failed to load analytics data"))
      .finally(() => setLoading(false));
  }, []);

  // Analytics calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'not started').length;
  
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const overdueTasks = tasks.filter(t => dayjs(t.dueDate).isBefore(dayjs()) && t.status !== 'completed').length;
  
  // Recent activity (last 7 days)
  const recentTasks = tasks.filter(t => 
    dayjs(t.dueDate).isAfter(dayjs().subtract(7, 'day'))
  );

  // Monthly trends
  const getMonthlyData = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = dayjs().subtract(i, 'month');
      const monthTasks = tasks.filter(t => 
        dayjs(t.dueDate).isSame(month, 'month')
      );
      months.push({
        month: month.format('MMM'),
        total: monthTasks.length,
        completed: monthTasks.filter(t => t.status === 'completed').length
      });
    }
    return months;
  };

  const monthlyData = getMonthlyData();

  // Status distribution
  const statusData = [
    { status: 'Completed', count: completedTasks, color: 'bg-green-500' },
    { status: 'Pending', count: pendingTasks, color: 'bg-yellow-500' },
    { status: 'In Progress', count: inProgressTasks, color: 'bg-blue-500' },
    { status: 'Not Started', count: notStartedTasks, color: 'bg-gray-500' }
  ];

  // Performance metrics
  const avgCompletionTime = tasks.length > 0 ? 
    tasks.reduce((acc, task) => {
      if (task.status === 'completed') {
        return acc + dayjs(task.dueDate).diff(dayjs(), 'day');
      }
      return acc;
    }, 0) / completedTasks : 0;

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
    <div className="max-w-7xl mx-auto p-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-3 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Comprehensive insights into your task performance
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {(['week', 'month', 'quarter'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{totalTasks}</div>
              <div className="text-sm opacity-90 font-semibold">Total Tasks</div>
            </div>
            <Target className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{completionRate.toFixed(1)}%</div>
              <div className="text-sm opacity-90 font-semibold">Completion Rate</div>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{completedTasks}</div>
              <div className="text-sm opacity-90 font-semibold">Completed</div>
            </div>
            <CheckCircle className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-2">{overdueTasks}</div>
              <div className="text-sm opacity-90 font-semibold">Overdue</div>
            </div>
            <AlertCircle className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Status Distribution */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Status Distribution</h3>
          </div>
          
          <div className="space-y-4">
            {statusData.map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${(item.count / totalTasks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400 w-8">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center gap-2 mb-6">
            <LineChart className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Monthly Trends</h3>
          </div>
          
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 dark:text-gray-300 w-12">
                  {data.month}
                </span>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">{data.total}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Completed</div>
                    <div className="font-bold text-green-600 dark:text-green-400">{data.completed}</div>
                  </div>
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                      style={{ width: `${data.total > 0 ? (data.completed / data.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-yellow-500" />
            <h4 className="font-bold text-gray-900 dark:text-gray-100">Average Completion Time</h4>
          </div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
            {Math.abs(avgCompletionTime).toFixed(1)} days
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {avgCompletionTime > 0 ? 'Ahead of schedule' : 'Behind schedule'}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-green-500" />
            <h4 className="font-bold text-gray-900 dark:text-gray-100">Productivity Score</h4>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {Math.min(100, Math.max(0, completionRate + (100 - overdueTasks * 10))).toFixed(0)}/100
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Based on completion rate and overdue tasks
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h4 className="font-bold text-gray-900 dark:text-gray-100">Recent Activity</h4>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {recentTasks.length}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tasks in the last 7 days
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Detailed Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{inProgressTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{notStartedTasks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Not Started</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
} 