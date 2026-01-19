using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BioProfile.Infrastructure.Data;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // Try to locate the API project's appsettings first (when running from the solution root)
        var current = Directory.GetCurrentDirectory();
        var apiFolder = Path.Combine(current, "..", "BioProfile.Api");
        var basePath = Directory.Exists(apiFolder) ? apiFolder : current;

        var builder = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
            .AddEnvironmentVariables();

        var config = builder.Build();

        var connectionString = config.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            // Fallback to a localdb default for development
            connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=BioProfileDb;Integrated Security=True;";
        }

        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.CommandTimeout(30);
        });

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}
