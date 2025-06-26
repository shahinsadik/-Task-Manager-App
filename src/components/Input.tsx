import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</label>
      <input
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent/50 transition ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  )
);
Input.displayName = "Input";
export default Input; 