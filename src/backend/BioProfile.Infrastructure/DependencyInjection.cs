using BioProfile.Application.Auth;
using BioProfile.Domain.IRepositories;
using BioProfile.Domain.Repositories;
using BioProfile.Application.BioProfiles;
using BioProfile.Infrastructure.Auth;
using BioProfile.Infrastructure.Data;
using BioProfile.Infrastructure.Data.Interceptors;

using BioProfile.Infrastructure.Repositories;
using BioProfile.Infrastructure.Service;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace BioProfile.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Register interceptors
        services.AddScoped<AuditableEntityInterceptor>();

        // 1. Lấy cấu hình chuỗi kết nối từ appsettings.json
        var defaultConnection = configuration.GetConnectionString("DefaultConnection");
        var postgresConnection = configuration.GetConnectionString("PostgresConnection");

        // 2. Logic Fallback: Ưu tiên SQL Server, nếu trống thì dùng PostgreSQL
        if (!string.IsNullOrWhiteSpace(defaultConnection))
        {
            // Register DbContext with SQL Server
            services.AddDbContext<ApplicationDbContext>((sp, options) =>
            {
                options.AddInterceptors(sp.GetRequiredService<AuditableEntityInterceptor>());

                options.UseSqlServer(
                    defaultConnection,
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
                    });
            });
        }
        else if (!string.IsNullOrWhiteSpace(postgresConnection))
        {
            // Register DbContext with PostgreSQL
            services.AddDbContext<ApplicationDbContext>((sp, options) =>
            {
                options.AddInterceptors(sp.GetRequiredService<AuditableEntityInterceptor>());

                options.UseNpgsql(
                    postgresConnection,
                    npgsqlOptions =>
                    {
                        // Specify migrations assembly
                        npgsqlOptions.MigrationsAssembly("BioProfile.Infrastructure");

                        // Enable retry on failure for transient errors
                        // Npgsql hỗ trợ tương tự SQL Server nhưng tham số thứ 3 gọi là errorCodesToAdd
                        npgsqlOptions.EnableRetryOnFailure(
                            maxRetryCount: 3,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorCodesToAdd: null);

                        // Set command timeout
                        npgsqlOptions.CommandTimeout(30);
                    });
            });
        }
        else
        {
            // Báo lỗi cứng nếu quên cấu hình DB
            throw new InvalidOperationException("Không tìm thấy chuỗi kết nối Database nào (DefaultConnection hoặc PostgresConnection) trong appsettings!");
        }

        // Register repositories
        services.AddScoped<IBioProfileRepository, BioProfileRepository>();
        services.AddScoped<ISocialLinkRepository, SocialLinkRepository>();
        services.AddScoped<IMusicRepository, MusicReponsitory>();
        services.AddScoped<IUserRepository, UserRepository>();

        // Register services
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IFileStorageService, FileStorageService>();

        return services;
    }
}
