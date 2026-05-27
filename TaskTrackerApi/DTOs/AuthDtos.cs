using System.ComponentModel.DataAnnotations;

namespace TaskTrackerApi.DTOs;

public record RegisterRequest(
    [param: Required, EmailAddress] string Email,
    [param: Required, MinLength(6)] string Password
);

public record LoginRequest(
    [param: Required, EmailAddress] string Email,
    [param: Required, MinLength(6)] string Password
);

public record AuthResponse(
    [param: Required] string Token,
    [param: Required] string UserId,
    [param: Required, EmailAddress] string Email
);
