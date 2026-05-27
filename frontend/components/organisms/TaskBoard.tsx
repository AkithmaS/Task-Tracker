import { Badge } from "@/components/atoms/Badge";
import { TaskCard } from "@/components/molecules/TaskCard";
import { Task, TaskStatus } from "@/types";

export type TaskBoardProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
};

const columns: { title: string; status: TaskStatus }[] = [
  { title: "To Do", status: TaskStatus.ToDo },
  { title: "In Progress", status: TaskStatus.InProgress },
  { title: "Done", status: TaskStatus.Done },
];

export const TaskBoard = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskBoardProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.status
        );

        return (
          <section
            key={column.status}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <header className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">
                {column.title}
              </h2>
              <Badge color="gray">{columnTasks.length}</Badge>
            </header>
            <div className="flex flex-1 flex-col gap-4">
              {columnTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
              {columnTasks.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No tasks in this column.
                </p>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default TaskBoard;
