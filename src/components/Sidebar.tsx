import React from "react";
import Link from "next/link";

const Sidebar = () => (
  <aside className="w-64 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 p-6 hidden md:flex flex-col min-h-screen">
    <div className="font-bold text-2xl mb-8 tracking-tight text-accent">TaskManager</div>
    <nav className="flex flex-col gap-2">
      <Link href="/" className="rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-accent/10 font-medium">Dashboard</Link>
      <Link href="/tasks/new" className="rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-accent/10 font-medium">Add Task</Link>
    </nav>
  </aside>
);

export default Sidebar; 