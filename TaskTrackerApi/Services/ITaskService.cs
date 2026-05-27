using TaskTrackerApi.DTOs;

namespace TaskTrackerApi.Services;

public interface ITaskService
{
    Task<List<TaskResponse>> GetTasksAsync(Guid userId);
    Task<TaskResponse> CreateTaskAsync(Guid userId, CreateTaskRequest request);
    Task<TaskResponse> UpdateTaskAsync(Guid userId, Guid taskId, UpdateTaskRequest request);
    Task DeleteTaskAsync(Guid userId, Guid taskId);
}
