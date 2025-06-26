import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Completed", "In Progress", "Pending"],
  datasets: [
    {
      data: [41, 35, 24],
      backgroundColor: ["#6366f1", "#22d3ee", "#fbbf24"],
      borderWidth: 0,
    },
  ],
};

const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
  },
};

export default function ProjectProgressDonut() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col items-center justify-center">
      <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Project Progress</div>
      <div className="relative w-32 h-32">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">41%</span>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent inline-block" /> Completed</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" /> In Progress</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> Pending</span>
      </div>
    </div>
  );
} 