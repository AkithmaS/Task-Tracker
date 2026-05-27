"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const displayName = session?.user?.name ?? session?.user?.email ?? "";

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-lg font-bold text-slate-900">
            Task Tracker
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            <Link className="text-sm font-medium text-slate-600" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm font-medium text-slate-600" href="/tasks">
              Tasks
            </Link>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Avatar name={displayName} />
          <Button size="sm" variant="secondary" onClick={() => signOut()}>
            Log out
          </Button>
        </div>
        <button
          className="md:hidden"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          ☰
        </button>
      </div>
      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link className="text-sm font-medium text-slate-700" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sm font-medium text-slate-700" href="/tasks">
              Tasks
            </Link>
            <div className="flex items-center gap-3">
              <Avatar name={displayName} size="sm" />
              <Button size="sm" variant="secondary" onClick={() => signOut()}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
