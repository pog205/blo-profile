using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BioProfile.Domain.Repositories;
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

        return services;
    }
}
