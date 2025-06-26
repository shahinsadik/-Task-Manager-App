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
    "px-4 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purpleAccent/50 disabled:opacity-60";
  const variants = {
    primary:
      "bg-purpleAccent text-white hover:bg-purpleDark",
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