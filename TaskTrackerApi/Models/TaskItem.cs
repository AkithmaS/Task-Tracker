namespace TaskTrackerApi.Models;

public class TaskItem
{
	public Guid Id { get; init; }
	public Guid UserId { get; set; }
	public User User { get; set; } = null!;
	public required string Title { get; set; }
	public string? Description { get; set; }
	public Priority Priority { get; set; }
	public TaskStatus Status { get; set; }
	public DateTime? DueDate { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
