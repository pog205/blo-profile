using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BioProfile.Application.Auth;
using BioProfile.Domain.IRepositories;
using BioProfile.Domain.Repositories;
using BioProfile.Infrastructure.Auth;
using BioProfile.Infrastructure.Data;
using BioProfile.Infrastructure.Data.Interceptors;
using BioProfile.Infrastructure.Repositories;

namespace BioProfile.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Register interceptors
        services.AddScoped<AuditableEntityInterceptor>();

        // Register DbContext with SQL Server
        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetRequiredService<AuditableEntityInterceptor>());

            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sqlOptions =>
                {
                    // Specify migrations assembly
                    sqlOptions.MigrationsAssembly("BioProfile.Infrastructure");

                    // Enable retry on failure for transient errors
                    sqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 3,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);

                    // Set command timeout
                    sqlOptions.CommandTimeout(30);

                    // Enable split queries for better performance with includes
                    // sqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                });
        });

        // Register repositories
        services.AddScoped<IBioProfileRepository, BioProfileRepository>();
        services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
        services.AddScoped<IMusicRepository, MusicReponsitory>();
        services.AddScoped<IUserRepository, UserRepository>();

        // Register services
        services.AddScoped<IJwtService, JwtService>();

        return services;
    }
}
