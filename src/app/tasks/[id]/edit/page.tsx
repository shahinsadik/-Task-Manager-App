"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { fetchTask, updateTask } from "../../../../utils/api";
import type { Task, TaskStatus } from "../../../../utils/types";
import Input from "../../../../components/Input";
import Textarea from "../../../../components/Textarea";
import Button from "../../../../components/Button";
import toast from "react-hot-toast";

const statusOptions: TaskStatus[] = ["pending", "completed", "in progress", "not started"];

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending" as TaskStatus,
      dueDate: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    fetchTask(id)
      .then((task: Task) => {
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("status", task.status);
        setValue("dueDate", task.dueDate.slice(0, 10));
      })
      .catch(() => toast.error("Task not found"));
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      await updateTask(id, data);
      toast.success("Task updated");
      router.push("/tasks");
      reset();
    } catch {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-full shadow-lg mx-auto bg-purpleCard dark:bg-purpleDeep rounded-2xl shadow-glass p-8 mt-10">
      <h1 className="text-3xl font-extrabold mb-2 text-purpleAccent">Edit Task</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Modify your task details below and save changes.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message as string}
        />

        {/* Description */}
        <Textarea
          label="Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description?.message as string}
        />

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-purpleAccent">Status</label>
          <select
            {...register("status", { required: true })}
            className="w-full px-3 py-2 rounded-lg border bg-purpleCard dark:bg-gray-900 border-purpleAccent/40 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purpleAccent/50 transition"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <Input
          label="Due Date"
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          error={errors.dueDate?.message as string}
        />

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button type="submit" loading={isSubmitting}>Update Task</Button>
        </div>
      </form>
    </div>
  );
}
