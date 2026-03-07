namespace BioProfile.Application.Dtos.AuthDtos;

public record RegisterRequest(
    string Username,
    string Email,
    string Password
);

public record LoginRequest(
    string Email,
    string Password
);

public record AuthResponse(
    string Token,
    string RefreshToken,
    DateTime Expiration,
    string Username,
    string Email
);
