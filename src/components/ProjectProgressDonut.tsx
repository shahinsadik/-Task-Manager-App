

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

// Chart data
const data = {
  labels: ["Completed", "In Progress", "Pending"],
  datasets: [
    {
      data: [41, 35, 24],
      backgroundColor: [
        "rgb(128, 90, 213)",  // 💜 purpleAccent (Completed)
        "rgb(34, 211, 238)",  // 🟦 cyan-400 (In Progress)
        "rgb(251, 191, 36)",  // 🟨 yellow-400 (Pending)
      ],
      borderWidth: 0,
    },
  ],
};

// Chart options
const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
  },
};

export default function ProjectProgressDonut() {
  return (
    <div className="shadow-md bg-[rgb(230,215,255)] dark:bg-[rgb(18,16,28)] rounded-2xl shadow p-6 flex flex-col items-center justify-center">
      <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100">
        Project Progress
      </div>
      <div className="relative w-32 h-32">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            41%
          </span>
        </div>
      </div>
      <div className="flex gap-4 mt-4 text-xs text-gray-700 dark:text-gray-300">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[rgb(128,90,213)]" /> Completed
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-cyan-400" /> In Progress
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400" /> Pending
        </span>
      </div>
    </div>
  );
}
