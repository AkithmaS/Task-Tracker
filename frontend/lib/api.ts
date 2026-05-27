import type {
	CreateTaskRequest,
	DashboardStats,
	Task,
	UpdateTaskRequest,
} from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

const request = async <T>(
	path: string,
	token: string,
	options?: RequestInit
): Promise<T> => {
	const response = await fetch(`${baseUrl}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...(options?.headers ?? {}),
		},
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || "Request failed");
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return (await response.json()) as T;
};

export const getTasks = async (token: string): Promise<Task[]> => {
	return request<Task[]>("/api/tasks", token);
};

export const createTask = async (
	token: string,
	payload: CreateTaskRequest
): Promise<Task> => {
	return request<Task>("/api/tasks", token, {
		method: "POST",
		body: JSON.stringify(payload),
	});
};

export const updateTask = async (
	token: string,
	payload: UpdateTaskRequest
): Promise<Task> => {
	return request<Task>(`/api/tasks/${payload.id}`, token, {
		method: "PUT",
		body: JSON.stringify(payload),
	});
};

export const deleteTask = async (
	token: string,
	id: string
): Promise<void> => {
	await request<void>(`/api/tasks/${id}`, token, {
		method: "DELETE",
	});
};

export const getDashboard = async (
	token: string
): Promise<DashboardStats> => {
	return request<DashboardStats>("/api/dashboard", token);
};
