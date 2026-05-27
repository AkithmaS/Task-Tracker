import { Button } from "@/components/atoms/Button";
import { PriorityBadge } from "@/components/molecules/PriorityBadge";
import { Task, TaskStatus } from "@/types";

export type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
};

const formatDate = (date?: string) => {
  if (!date) {
    return "No due date";
  }

  return new Date(date).toLocaleDateString();
};

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {task.title}
          </h3>
          <p className="mt-1 truncate text-sm text-slate-600">
            {task.description || "No description."}
          </p>
        </div>
        <PriorityBadge priority={task.priority} />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">Due {formatDate(task.dueDate)}</p>
        <select
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
          value={task.status}
          onChange={(event) =>
            onStatusChange(task, event.target.value as TaskStatus)
          }
          aria-label="Change task status"
        >
          {Object.values(TaskStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(task)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
