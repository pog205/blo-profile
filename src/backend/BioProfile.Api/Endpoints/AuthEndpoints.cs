using BioProfile.Application.Commands.Auth;
using BioProfile.Application.Common;
using BioProfile.Application.Dtos.AuthDtos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace BioProfile.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth")
            .WithTags("Authentication");

        group.MapPost("/register", RegisterAsync)
            .WithName("Register");

        group.MapPost("/login", LoginAsync)
            .WithName("Login");

        group.MapPost("/logout", LogoutAsync)
            .WithName("Logout")
            .RequireAuthorization();
    }

    private static async Task<IResult> RegisterAsync(
        [FromBody] RegisterRequest request,
        [FromServices] ICommandHandler<RegisterCommand, Result<AuthResponse>> handler)
    {
        var command = new RegisterCommand(request.Username, request.Email, request.Password);
        var result = await handler.Handle(command, CancellationToken.None);

        return result.IsSuccess
            ? Results.Ok(result.Value)
            : Results.BadRequest(new { error = result.Error });
    }

    private static async Task<IResult> LoginAsync(
        [FromBody] LoginRequest request,
        [FromServices] ICommandHandler<LoginCommand, Result<AuthResponse>> handler)
    {
        var command = new LoginCommand(request.Email, request.Password);
        var result = await handler.Handle(command, CancellationToken.None);

        return result.IsSuccess
            ? Results.Ok(result.Value)
            : Results.BadRequest(new { error = result.Error });
    }

    private static IResult LogoutAsync(HttpContext context)
    {
        return Results.Ok(new { message = "Logged out successfully" });
    }
}
