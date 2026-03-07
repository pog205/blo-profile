using Microsoft.EntityFrameworkCore;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<BioProfileEntity> BioProfiles => Set<BioProfileEntity>();
    public DbSet<Music> Musics => Set<Music>();
    public DbSet<SocialLink> SocialLinks => Set<SocialLink>();
    public DbSet<UserSocialLink> UserSocialLinks => Set<UserSocialLink>();
    public DbSet<UserAccount> UserAccounts => Set<UserAccount>();
    public DbSet<BackgroundEffect> BackgroundEffects => Set<BackgroundEffect>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all configurations from the current assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // Seed initial data
        modelBuilder.SeedData();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        // Enable sensitive data logging in development (optional)
        // optionsBuilder.EnableSensitiveDataLogging();
    }
}
