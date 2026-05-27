import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

type LoginResponse = {
	token: string;
	userId: string;
	email: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const response = await fetch(
					`${process.env.API_URL}/api/auth/login`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					}
				);

				if (!response.ok) {
					return null;
				}

				const data = (await response.json()) as LoginResponse;

				return {
					id: data.userId,
					email: data.email,
					accessToken: data.token,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = (user as { id: string }).id;
				token.accessToken = (user as { accessToken: string }).accessToken;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.accessToken = token.accessToken as string;
			}

			return session;
		},
	},
});

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			accessToken: string;
			email?: string | null;
			name?: string | null;
			image?: string | null;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id?: string;
		accessToken?: string;
	}
}
