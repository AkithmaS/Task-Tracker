using System.ComponentModel.DataAnnotations;
using TaskTrackerApi.Models;
using TaskStatusModel = TaskTrackerApi.Models.TaskStatus;

namespace TaskTrackerApi.DTOs;

public record CreateTaskRequest(
    [param: Required, MaxLength(200)] string Title,
    string? Description,
    Priority Priority,
    TaskStatusModel Status,
    DateTime? DueDate
);

public record UpdateTaskRequest(
    string? Title,
    string? Description,
    Priority? Priority,
    TaskStatusModel? Status,
    DateTime? DueDate
);

public record TaskResponse(
    Guid Id,
    Guid UserId,
    string Title,
    string? Description,
    Priority Priority,
    string PriorityLabel,
    TaskStatusModel Status,
    string StatusLabel,
    DateTime? DueDate,
    DateTime CreatedAt
);

public record DashboardResponse(
    int TodoCount,
    int InProgressCount,
    int DoneCount,
    List<TaskResponse> OverdueTasks
);
