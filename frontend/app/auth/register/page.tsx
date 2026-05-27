"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";

export default function RegisterPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setIsLoading(true);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		);

		setIsLoading(false);

		if (!response.ok) {
			setError("Unable to create account. Please try again.");
			return;
		}

		router.push("/auth/login");
	};

	return (
		<AuthLayout title="Create account">
			<form className="space-y-5" onSubmit={handleSubmit}>
				<FormField
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					required
				/>
				<FormField
					label="Password"
					name="password"
					type="password"
					autoComplete="new-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
				/>
				<FormField
					label="Confirm password"
					name="confirmPassword"
					type="password"
					autoComplete="new-password"
					value={confirmPassword}
					onChange={(event) => setConfirmPassword(event.target.value)}
					required
				/>
				{error ? (
					<p className="text-sm text-red-600" role="alert">
						{error}
					</p>
				) : null}
				<Button className="w-full" isLoading={isLoading} type="submit">
					Create account
				</Button>
			</form>
			<p className="mt-6 text-sm text-slate-600">
				Already have an account?{" "}
				<Link className="font-medium text-slate-900" href="/auth/login">
					Sign in
				</Link>
			</p>
		</AuthLayout>
	);
}
