using Microsoft.EntityFrameworkCore;
using TaskTrackerApi.Data;
using TaskTrackerApi.DTOs;
using TaskTrackerApi.Models;

namespace TaskTrackerApi.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _dbContext;

    public TaskService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<TaskResponse>> GetTasksAsync(Guid userId)
    {
        var tasks = await _dbContext.Tasks
            .AsNoTracking()
            .Where(task => task.UserId == userId)
            .OrderByDescending(task => task.CreatedAt)
            .ToListAsync();

        return tasks.Select(MapToResponse).ToList();
    }

    public async Task<TaskResponse> CreateTaskAsync(Guid userId, CreateTaskRequest request)
    {
        var task = new TaskItem
        {
            UserId = userId,
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            Status = request.Status,
            DueDate = request.DueDate
        };

        _dbContext.Tasks.Add(task);
        await _dbContext.SaveChangesAsync();

        return MapToResponse(task);
    }

    public async Task<TaskResponse> UpdateTaskAsync(Guid userId, Guid taskId, UpdateTaskRequest request)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(item => item.Id == taskId && item.UserId == userId);

        if (task is null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        if (request.Title is not null)
        {
            task.Title = request.Title;
        }

        if (request.Description is not null)
        {
            task.Description = request.Description;
        }

        if (request.Priority.HasValue)
        {
            task.Priority = request.Priority.Value;
        }

        if (request.Status.HasValue)
        {
            task.Status = request.Status.Value;
        }

        if (request.DueDate.HasValue)
        {
            task.DueDate = request.DueDate;
        }

        await _dbContext.SaveChangesAsync();

        return MapToResponse(task);
    }

    public async Task DeleteTaskAsync(Guid userId, Guid taskId)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(item => item.Id == taskId && item.UserId == userId);

        if (task is null)
        {
            throw new KeyNotFoundException("Task not found");
        }

        _dbContext.Tasks.Remove(task);
        await _dbContext.SaveChangesAsync();
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
