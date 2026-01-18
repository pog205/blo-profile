using Microsoft.Extensions.DependencyInjection;
using BioProfile.Application.BioProfiles;

namespace BioProfile.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register application services
        services.AddScoped<IBioProfileService, BioProfileService>();

        return services;
    }
}
