using BioProfile.Application.Auth;
using BioProfile.Application.Commands.Auth;
using BioProfile.Application.Common;
using BioProfile.Application.Dtos.AuthDtos;
using BioProfile.Domain.Entities;
using BioProfile.Domain.IRepositories;
using BioProfile.Domain.Repositories;

namespace BioProfile.Application.Commands.Auth;

public class RegisterCommandHandler(
    IUserRepository userRepository,
    IJwtService jwtService,
    IBioProfileRepository bioProfileRepository) : ICommandHandler<RegisterCommand, Result<AuthResponse>>
{
    public async Task<Result<AuthResponse>> Handle(RegisterCommand command, CancellationToken cancellationToken)
    {
        // Validate email exists
        if (await userRepository.EmailExistsAsync(command.Email))
        {
            return Result<AuthResponse>.Failure("Email already exists");
        }

        // Validate username exists
        if (await userRepository.UsernameExistsAsync(command.Username))
        {
            return Result<AuthResponse>.Failure("Username already exists");
        }

        // Hash password
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(command.Password);

        // Create user
        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            Username = command.Username,
            Email = command.Email,
            PasswordHash = passwordHash,
            CreatedAt = DateTime.UtcNow
        };

        // Generate tokens
        var accessToken = jwtService.GenerateAccessToken(user.Id, user.Email, user.Username);
        var refreshToken = jwtService.GenerateRefreshToken();
        var expiration = jwtService.GetTokenExpiration();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await userRepository.AddAsync(user);
        await AddBioProfileForUserAsync(user);
        return Result<AuthResponse>.Success(new AuthResponse(
            accessToken,
            refreshToken,
            expiration,
            user.Username,
            user.Email
        ));
    }
    private async Task AddBioProfileForUserAsync(UserAccount user)
    {
        var bioProfile = new BioProfile.Domain.Entities.BioProfileEntity
        {
            Id = Guid.NewGuid(),
            Slug = user.Username,
            Name = user.Username,
            CreatedAt = DateTime.UtcNow
        };
        await bioProfileRepository.AddAsync(bioProfile);
        
    }
}
public class LoginCommandHandler(
    IUserRepository userRepository,
    IJwtService jwtService) : ICommandHandler<LoginCommand, Result<AuthResponse>>
{
    public async Task<Result<AuthResponse>> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        // Find user by email
        var user = await userRepository.GetByEmailAsync(command.Email);
        if (user == null)
        {
            return Result<AuthResponse>.Failure("Invalid email or password");
        }

        // Verify password
        if (!BCrypt.Net.BCrypt.Verify(command.Password, user.PasswordHash))
        {
            return Result<AuthResponse>.Failure("Invalid email or password");
        }

        // Generate tokens
        var accessToken = jwtService.GenerateAccessToken(user.Id, user.Email, user.Username);
        var refreshToken = jwtService.GenerateRefreshToken();
        var expiration = jwtService.GetTokenExpiration();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await userRepository.UpdateAsync(user);

        return Result<AuthResponse>.Success(new AuthResponse(
            accessToken,
            refreshToken,
            expiration,
            user.Username,
            user.Email
        ));
    }
}
