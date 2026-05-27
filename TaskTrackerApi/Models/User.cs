namespace TaskTrackerApi.Models;

public class User
{
	public Guid Id { get; init; }
	public required string Email { get; set; }
	public required string PasswordHash { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
