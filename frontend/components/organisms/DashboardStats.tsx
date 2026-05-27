import { Badge } from "@/components/atoms/Badge";
import type { DashboardStats as DashboardStatsType } from "@/types";

export type DashboardStatsProps = {
  stats: DashboardStatsType;
};

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">To do</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.todoCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">In progress</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.inProgressCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Done</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.doneCount}
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Overdue</h2>
          <Badge color="red">{stats.overdueTasks.length}</Badge>
        </div>
        {stats.overdueTasks.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">All caught up!</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {stats.overdueTasks.map((task) => (
              <li key={task.id} className="text-sm text-slate-700">
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DashboardStats;
