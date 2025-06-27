"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createTask } from "../../../utils/api";
import type { TaskStatus } from "../../../utils/types";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import toast from "react-hot-toast";

const statusOptions: TaskStatus[] = ["pending", "completed", "in progress", "not started"];

export default function AddTaskPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending" as TaskStatus,
      dueDate: "",
    },
  });

  const onSubmit = async (data: {
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
  }) => {
    try {
      await createTask(data);
      toast.success("Task created");
      router.push("/tasks");
      reset();
    } catch {
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="max-w-full shadow-md bg-[rgb(230,215,255)] dark:bg-[rgb(18,16,28)] rounded-2xl shadow-lg p-8 mt-5">
      <h1 className="text-3xl font-extrabold mb-2 text-[rgb(128,90,213)]">Add New Task</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Fill in the details below to add a new task to your list.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message as string}
        />

        <Textarea
          label="Description"
          {...register("description", { required: "Description is required" })}
          error={errors.description?.message as string}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-[rgb(128,90,213)]">
            Status
          </label>
          <select
            {...register("status", { required: true })}
            className="w-full px-3 py-2 rounded-lg border bg-[rgb(240,248,255)] dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[rgb(128,90,213)]/50 transition"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Due Date"
          type="date"
          {...register("dueDate", { required: "Due date is required" })}
          error={errors.dueDate?.message as string}
        />

        <div className="flex justify-end mt-6">
          <Button type="submit" loading={isSubmitting}>Add Task</Button>
        </div>
      </form>
    </div>
  );
}
