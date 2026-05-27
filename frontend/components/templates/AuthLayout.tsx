import type { ReactNode } from "react";

export type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Task Tracker
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
