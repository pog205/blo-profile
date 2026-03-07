using BioProfile.Application.Common;
using BioProfile.Application.Dtos.AuthDtos;

namespace BioProfile.Application.Commands.Auth;

public record RegisterCommand(
    string Username,
    string Email,
    string Password
) : ICommand<Result<AuthResponse>>;

public record LoginCommand(
    string Email,
    string Password
) : ICommand<Result<AuthResponse>>;
