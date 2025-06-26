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

const statusOptions: TaskStatus[] = ["pending", "completed"];

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
      router.push("/");
      reset();
    } catch {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Status</label>
          <select
            {...register("status", { required: true })}
            className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
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
          <Button type="submit" loading={isSubmitting}>
            Update Task
          </Button>
        </div>
      </form>
    </div>
  );
} 