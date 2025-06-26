"use client";
import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ListChecks,
  Calendar,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  DownloadCloud,
  Plus
} from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Dashboard", icon: (active: boolean) => <LayoutDashboard size={20} className={active ? "text-pastel-blue" : "text-blue-400"} /> },
  { href: "/tasks", label: "Tasks", icon: (active: boolean) => <ListChecks size={20} className={active ? "text-pastel-green" : "text-green-500"} /> },
  { href: "/tasks/new", label: "Add Tasks", icon: (active: boolean) => <Plus size={20} className={active ? "text-pastel-yellow" : "text-yellow-400"} /> },
  { href: "#", label: "Calendar", icon: (active: boolean) => <Calendar size={20} className={active ? "text-pastel-pink" : "text-pink-400"} /> },
  { href: "#", label: "Analytics", icon: (active: boolean) => <BarChart2 size={20} className={active ? "text-pastel-yellow" : "text-yellow-400"} /> },
  { href: "#", label: "Team", icon: (active: boolean) => <Users size={20} className={active ? "text-pastel-purple" : "text-purple-400"} /> },
];

const generalLinks = [
  { href: "#", label: "Settings", icon: (active: boolean) => <Settings size={20} className={active ? "text-pastel-blue" : "text-blue-400"} /> },
  { href: "#", label: "Help", icon: (active: boolean) => <HelpCircle size={20} className={active ? "text-pastel-green" : "text-green-500"} /> },
  { href: "#", label: "Logout", icon: (active: boolean) => <LogOut size={20} className={active ? "text-pastel-pink" : "text-pink-400"} /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-72 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 p-6 flex flex-col min-h-screen shadow-md rounded-r-2xl">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-accent/10 rounded-full p-2">
          <DownloadCloud className="text-accent" size={28} />
        </div>
        <span className="font-extrabold text-2xl tracking-tight text-accent">Donezo</span>
      </div>
      {/* Navigation */}
      <nav className="flex flex-col gap-1 mb-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                isActive
                  ? "bg-pastel-purple text-accent shadow font-bold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-accent/10"
              }`}
            >
              {link.icon(isActive)}
              {link.label}
            </Link>
          );
        })}
      </nav>
      {/* General Section */}
      <div className="mt-auto mb-6">
        <div className="text-xs text-gray-400 uppercase mb-2 ml-2">General</div>
        <nav className="flex flex-col gap-1">
          {generalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-accent/10 font-medium transition"
            >
              {link.icon(false)}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Download Card */}
      <div className="mt-2 p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex flex-col items-center shadow">
        <div className="mb-2">
          <DownloadCloud className="text-green-700 dark:text-green-300" size={32} />
        </div>
        <div className="font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">Download our Mobile App</div>
        <div className="text-xs text-gray-600 dark:text-gray-300 mb-3 text-center">Get easy access in another way</div>
        <button className="px-4 py-1 rounded-full bg-accent text-white font-semibold text-sm shadow hover:bg-accent-dark transition">Download</button>
      </div>
    </aside>
  );
} 