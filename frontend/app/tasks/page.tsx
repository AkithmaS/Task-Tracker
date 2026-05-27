"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { TaskBoard } from "@/components/organisms/TaskBoard";
import { TaskForm } from "@/components/organisms/TaskForm";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Button } from "@/components/atoms/Button";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "@/lib/api";
import { CreateTaskRequest, Task, TaskStatus, UpdateTaskRequest } from "@/types";

export default function TasksPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const token = session?.user?.accessToken ?? "";

  const loadTasks = async () => {
    if (!token) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await getTasks(token);
      setTasks(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (token) {
      loadTasks();
    }
  }, [token]);

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return tasks;
    }

    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term)
    );
  }, [tasks, search]);

  const handleOpenCreate = () => {
    setActiveTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (task: Task) => {
    if (!token) {
      return;
    }

    await deleteTask(token, task.id);
    await loadTasks();
  };

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    if (!token) {
      return;
    }

    await updateTask(token, {
      id: task.id,
      status,
    });
    await loadTasks();
  };

  const handleSubmit = async (payload: {
    id?: string;
    title: string;
    description?: string;
    priority: CreateTaskRequest["priority"];
    status: CreateTaskRequest["status"];
    dueDate?: string;
  }) => {
    if (!token) {
      return;
    }

    setIsSubmitting(true);

    if (payload.id) {
      await updateTask(token, payload as UpdateTaskRequest);
    } else {
      await createTask(token, payload as CreateTaskRequest);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    await loadTasks();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
            <p className="text-sm text-slate-600">
              Keep your work organized and on track.
            </p>
          </div>
          <Button onClick={handleOpenCreate}>New task</Button>
        </div>
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />
        {isLoading ? (
          <div className="space-y-3">
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
          </div>
        ) : (
          <TaskBoard
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
      {isModalOpen ? (
        <TaskForm
          task={activeTask}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      ) : null}
    </DashboardLayout>
  );
}
