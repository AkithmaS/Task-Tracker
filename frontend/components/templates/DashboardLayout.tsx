import type { ReactNode } from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { Sidebar } from "@/components/organisms/Sidebar";

export type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
