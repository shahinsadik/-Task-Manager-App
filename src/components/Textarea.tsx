import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">{label}</label>
      <textarea
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent/50 transition ${error ? 'border-red-500' : ''}`}
        rows={4}
        {...props}
      />
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  )
);
Textarea.displayName = "Textarea";
export default Textarea; 