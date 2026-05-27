using Microsoft.EntityFrameworkCore;
using TaskTrackerApi.Data;
using TaskTrackerApi.DTOs;
using TaskTrackerApi.Models;
using TaskStatusModel = TaskTrackerApi.Models.TaskStatus;

namespace TaskTrackerApi.Services;

public class DashboardService : IDashboardService
{
    private readonly AppDbContext _dbContext;

    public DashboardService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DashboardResponse> GetDashboardAsync(Guid userId)
    {
        var tasks = await _dbContext.Tasks
            .AsNoTracking()
            .Where(task => task.UserId == userId)
            .ToListAsync();

        var todoCount = tasks.Count(task => task.Status == TaskStatusModel.ToDo);
        var inProgressCount = tasks.Count(task => task.Status == TaskStatusModel.InProgress);
        var doneCount = tasks.Count(task => task.Status == TaskStatusModel.Done);

        var overdueTasks = tasks
            .Where(task =>
                task.DueDate.HasValue &&
                task.DueDate.Value < DateTime.UtcNow &&
                task.Status != TaskStatusModel.Done)
            .Select(MapToResponse)
            .ToList();

        return new DashboardResponse(todoCount, inProgressCount, doneCount, overdueTasks);
    }

    private static TaskResponse MapToResponse(TaskItem task)
    {
        return new TaskResponse(
            task.Id,
            task.UserId,
            task.Title,
            task.Description,
            task.Priority,
            task.Priority.ToString(),
            task.Status,
            task.Status.ToString(),
            task.DueDate,
            task.CreatedAt
        );
    }
}
