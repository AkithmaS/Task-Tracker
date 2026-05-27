export enum Priority {
	Low = "Low",
	Medium = "Medium",
	High = "High",
}

export enum TaskStatus {
	ToDo = "ToDo",
	InProgress = "InProgress",
	Done = "Done",
}

export interface User {
	id: string;
	email: string;
	name?: string;
}

export interface Task {
	id: string;
	userId: string;
	title: string;
	description?: string;
	priority: Priority;
	status: TaskStatus;
	dueDate?: string;
	createdAt: string;
}

export interface CreateTaskRequest {
	title: string;
	description?: string;
	priority: Priority;
	status?: TaskStatus;
	dueDate?: string;
}

export interface UpdateTaskRequest {
	id: string;
	title?: string;
	description?: string;
	priority?: Priority;
	status?: TaskStatus;
	dueDate?: string;
}

export interface DashboardStats {
	todoCount: number;
	inProgressCount: number;
	doneCount: number;
	overdueTasks: Task[];
}
