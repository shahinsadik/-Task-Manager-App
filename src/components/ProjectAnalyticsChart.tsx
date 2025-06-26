import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [
    {
      label: "Tasks Completed",
      data: [3, 7, 4, 6, 5, 2, 4],
      backgroundColor: "#6366f1",
      borderRadius: 8,
      barThickness: 24,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#6b7280", font: { size: 12 } },
    },
    y: {
      grid: { color: "#e5e7eb" },
      ticks: { color: "#6b7280", font: { size: 12 }, stepSize: 2 },
      beginAtZero: true,
      max: 10,
    },
  },
};

export default function ProjectAnalyticsChart() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
      <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Project Analytics</div>
      <Bar data={data} options={options} height={120} />
    </div>
  );
} 