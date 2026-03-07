using Microsoft.Extensions.DependencyInjection;
using BioProfile.Application.BioProfiles;
using BioProfile.Application.Commands.Auth;
using BioProfile.Application.Common;
using BioProfile.Application.Dtos.AuthDtos;

namespace BioProfile.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register MediatR
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly));

        // Register application services
        services.AddScoped<IBioProfileService, BioProfileService>();

        // Register command handlers
        services.AddScoped<ICommandHandler<RegisterCommand, Result<AuthResponse>>, RegisterCommandHandler>();
        services.AddScoped<ICommandHandler<LoginCommand, Result<AuthResponse>>, LoginCommandHandler>();

        return services;
    }
}
