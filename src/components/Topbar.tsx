import React from "react";
import ThemeToggle from "./ThemeToggle";

const Topbar = () => (
  <header className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-10">
    <div className="text-lg font-semibold">Dashboard</div>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {/* Avatar placeholder */}
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
    </div>
  </header>
);

export default Topbar; 