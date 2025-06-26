import React from "react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function Modal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading,
}: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        {description && <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 