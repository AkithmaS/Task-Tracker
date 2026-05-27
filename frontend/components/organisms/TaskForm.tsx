"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { Priority, Task, TaskStatus } from "@/types";

export type TaskFormProps = {
  task?: Task | null;
  onSubmit: (payload: {
    id?: string;
    title: string;
    description?: string;
    priority: Priority;
    status: TaskStatus;
    dueDate?: string;
  }) => void;
  onClose: () => void;
  isLoading?: boolean;
};

export const TaskForm = ({ task, onSubmit, onClose, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ToDo);
  const [dueDate, setDueDate] = useState("");
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const isEdit = Boolean(task);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate?.split("T")[0] ?? "");
    } else {
      setTitle("");
      setDescription("");
      setPriority(Priority.Medium);
      setStatus(TaskStatus.ToDo);
      setDueDate("");
    }
  }, [task]);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const elements = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    );

    if (elements.length === 0) {
      return;
    }

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      id: task?.id,
      title,
      description: description || undefined,
      priority,
      status,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? "Edit task" : "Create task"}
        onKeyDown={handleKeyDown}
        ref={dialogRef}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit task" : "New task"}
            </h2>
            <p className="text-sm text-slate-500">
              {isEdit
                ? "Update the details for this task."
                : "Capture what needs to get done."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <FormField
            label="Title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            inputRef={firstFieldRef}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={priority}
                onChange={(event) => setPriority(event.target.value as Priority)}
              >
                {Object.values(Priority).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
              >
                {Object.values(TaskStatus).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="dueDate">
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              {isEdit ? "Save changes" : "Create task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
