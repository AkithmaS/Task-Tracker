"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		setIsLoading(true);

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		setIsLoading(false);

		if (result?.error) {
			setError("Invalid email or password.");
			return;
		}

		router.push("/dashboard");
	};

	return (
		<AuthLayout title="Sign in">
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
					autoComplete="current-password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					required
				/>
				{error ? (
					<p className="text-sm text-red-600" role="alert">
						{error}
					</p>
				) : null}
				<Button className="w-full" isLoading={isLoading} type="submit">
					Sign in
				</Button>
			</form>
			<p className="mt-6 text-sm text-slate-600">
				New here?{" "}
				<Link className="font-medium text-slate-900" href="/auth/register">
					Create an account
				</Link>
			</p>
		</AuthLayout>
	);
}
