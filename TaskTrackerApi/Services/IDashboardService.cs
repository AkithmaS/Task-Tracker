using TaskTrackerApi.DTOs;

namespace TaskTrackerApi.Services;

public interface IDashboardService
{
    Task<DashboardResponse> GetDashboardAsync(Guid userId);
}
