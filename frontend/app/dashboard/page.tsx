import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getDashboard } from "@/lib/api";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { DashboardStats } from "@/components/organisms/DashboardStats";

export default async function DashboardPage() {
	const session = await auth();

	if (!session?.user?.accessToken) {
		redirect("/auth/login");
	}

	try {
		const stats = await getDashboard(session.user.accessToken);

		return (
			<DashboardLayout>
				<DashboardStats stats={stats} />
			</DashboardLayout>
		);
	} catch (error) {
		return (
			<DashboardLayout>
				<div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
					Unable to load dashboard data. Please try again.
				</div>
			</DashboardLayout>
		);
	}
}
