using BioProfile.Domain.Entities;
using BioProfile.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace BioProfile.Infrastructure.Data;

public static class DbSeeder
{
    private static readonly DateTime SeedCreatedAt = new(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public static void SeedData(this ModelBuilder modelBuilder)
    {
        SeedBackgroundEffects(modelBuilder);
        SeedBioProfiles(modelBuilder);
        SeedSocialLinks(modelBuilder);
    }

    private static void SeedBackgroundEffects(ModelBuilder modelBuilder)
    {
        var backgroundEffects = new List<BackgroundEffect>
        {
            new()
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                Name = "Gaming Network",
                ColorHex = "#00ff00",
                Shape = ParticleShape.Circle,
                Opacity = 0.6,
                SizeMin = 2.0,
                SizeMax = 4.0,
                Preset = ParticlePreset.Network,
                MoveSpeed = 2.5,
                ParticleCount = 100,
                EnableLinks = true,
                EnableHoverEffect = true,
                IsActive = true,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            },
            new()
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                Name = "Snow Falling",
                ColorHex = "#ffffff",
                Shape = ParticleShape.Circle,
                Opacity = 0.8,
                SizeMin = 1.0,
                SizeMax = 3.0,
                Preset = ParticlePreset.Falling,
                MoveSpeed = 1.5,
                ParticleCount = 150,
                EnableLinks = false,
                EnableHoverEffect = false,
                IsActive = true,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            },
            new()
            {
                Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                Name = "Fireflies",
                ColorHex = "#ffff00",
                Shape = ParticleShape.Star,
                Opacity = 0.7,
                SizeMin = 1.5,
                SizeMax = 2.5,
                Preset = ParticlePreset.Floating,
                MoveSpeed = 1.0,
                ParticleCount = 80,
                EnableLinks = false,
                EnableHoverEffect = true,
                IsActive = true,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            },
            new()
            {
                Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                Name = "Fire & Smoke",
                ColorHex = "#ff6600",
                Shape = ParticleShape.Circle,
                Opacity = 0.5,
                SizeMin = 2.0,
                SizeMax = 5.0,
                Preset = ParticlePreset.Fire,
                MoveSpeed = 3.0,
                ParticleCount = 120,
                EnableLinks = false,
                EnableHoverEffect = false,
                IsActive = true,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            },
            new()
            {
                Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                Name = "Matrix Code",
                ColorHex = "#00ff00",
                Shape = ParticleShape.Square,
                Opacity = 0.9,
                SizeMin = 1.0,
                SizeMax = 2.0,
                Preset = ParticlePreset.Falling,
                MoveSpeed = 4.0,
                ParticleCount = 200,
                EnableLinks = false,
                EnableHoverEffect = false,
                IsActive = true,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            }
        };

        modelBuilder.Entity<BackgroundEffect>().HasData(backgroundEffects);
    }

    private static void SeedBioProfiles(ModelBuilder modelBuilder)
    {
        var bioProfiles = new List<BioProfileEntity>
        {
            new()
            {
                Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                Slug = "demo-profile",
                Name = "Demo User",
                Location = "Vietnam",
                Description = "This is a demo bio profile with gaming theme",
                AvatarUrl = "https://i.pravatar.cc/300",
                BackgroundUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
                FontFamily = "Inter",
                AccentColor = "#6366f1",
                TextColor = "#1f2937",
                BackgroundColor = "#ffffff",
                IconsColor = "#4b5563",
                ProfileOpacity = 0.95,
                ProfileBlur = 10.5,
                MouseEffectUrl = null,
                BackgroundEffectId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                // UserId removed - will be linked to UserAccount
                Views = 0,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            },
            new()
            {
                Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                Slug = "winter-theme",
                Name = "Winter Vibe",
                Location = "Iceland",
                Description = "Chill winter aesthetic profile",
                AvatarUrl = "https://i.pravatar.cc/300?img=1",
                BackgroundUrl = "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
                FontFamily = "Inter",
                AccentColor = "#3b82f6",
                TextColor = "#1e293b",
                BackgroundColor = "#f8fafc",
                IconsColor = "#64748b",
                ProfileOpacity = 0.90,
                ProfileBlur = 8.0,
                MouseEffectUrl = null,
                BackgroundEffectId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                // UserId removed - will be linked to UserAccount
                Views = 0,
                CreatedAt = SeedCreatedAt,
                CreatedBy = "System"
            }
        };

        modelBuilder.Entity<BioProfileEntity>().HasData(bioProfiles);
    }

    private static void SeedSocialLinks(ModelBuilder modelBuilder)
    {
        var socialLinks = new List<SocialLink>
        {
            new()
            {
                Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                Platform = SocialPlatform.GitHub,
                Icon = "https://cdn.simpleicons.org/github",
                CreatedAt = SeedCreatedAt
            },
            new()
            {
                Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                Platform = SocialPlatform.X,
                Icon = "https://cdn.simpleicons.org/x",
                CreatedAt = SeedCreatedAt
            },
            new()
            {
                Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                Platform = SocialPlatform.LinkedIn,
                Icon = "https://cdn.simpleicons.org/linkedin",
                CreatedAt = SeedCreatedAt
            }
        };

        modelBuilder.Entity<SocialLink>().HasData(socialLinks);
    }
}
