
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Bell, Search, User } from "lucide-react";

const Topbar = () => (
  <header className= "shadow-b-md h-20 flex items-center justify-between px-8 border-b border-[rgb(230,215,255)] dark:border-[rgb(18,16,28)] bg-[rgb(230,215,255)]/80 dark:bg-[rgb(18,16,28)]/80 backdrop-blur sticky top-0 z-10">
    {/* Left: Search bar and page title */}
    <div className="flex items-center gap-6 w-full max-w-lg">
      <form className="flex items-center w-full relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search task"
          className="w-full pl-10 pr-4 py-2 shadow-md rounded-lg bg-white dark:bg-[rgb(34,34,52)] text-[rgb(64,41,117)] dark:text-[rgb(230,215,255)] focus:outline-none focus:ring-2 focus:ring-[rgb(128,90,213)]/30 transition"
        />
      </form>
      <span className="hidden md:inline text-2xl font-bold text-[rgb(128,90,213)] dark:text-[rgb(230,215,255)]">
        Dashboard
      </span>
    </div>

    {/* Right: Theme toggle, notifications, avatar */}
    <div className="flex items-center gap-4">
      <ThemeToggle />

      <button className="relative p-2 rounded-full hover:bg-[rgb(245,245,255)] dark:hover:bg-[rgb(40,40,60)] transition shadow-md">
        <Bell size={22} className="text-gray-500 dark:text-gray-300" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
      </button>

      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shadow-md">
        <User size={24} className="text-gray-500 dark:text-gray-300" />
      </div>
    </div>
  </header>
);

export default Topbar;
