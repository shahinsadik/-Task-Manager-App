"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-60";
  const variants = {
    primary:
      "bg-accent text-white hover:bg-accent-dark",
    secondary:
      "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700",
  };
  return (
    <button className={`${base} ${variants[variant]}`} disabled={loading || props.disabled} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button; 