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
    "flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:scale-105 transition text-sm focus:outline-none focus:ring-2 focus:ring-purpleAccent/50 disabled:opacity-60";
  const variants = {
    primary:
      "",
    secondary:
      "bg-purpleCard dark:bg-purpleDeep text-purpleDeep dark:text-purpleCard hover:bg-purpleBg dark:hover:bg-purpleDark",
  };
  return (
    <button className={`${base} ${variants[variant]}`} disabled={loading || props.disabled} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button; 