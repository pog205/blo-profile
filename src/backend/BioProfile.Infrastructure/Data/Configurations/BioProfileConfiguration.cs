using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data.Configurations;

public class BioProfileConfiguration : BaseEntityConfiguration<BioProfileEntity, Guid>
{
    protected override void ConfigureEntity(EntityTypeBuilder<BioProfileEntity> builder)
    {
        builder.ToTable("BioProfiles");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .ValueGeneratedNever();

        // Profile Settings
        builder.Property(b => b.Slug)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(b => b.Name)
            .IsRequired()
            .HasMaxLength(200);


        builder.Property(b => b.Location)
            .HasMaxLength(200);

        builder.Property(b => b.Description)
            .HasMaxLength(1000);

        builder.Property(b => b.AvatarUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(b => b.BackgroundUrl)
            .IsRequired()
            .HasMaxLength(500);

        // Theme Settings
        builder.Property(b => b.FontFamily)
            .IsRequired()
            .HasMaxLength(100)
            .HasDefaultValue("Inter");

        builder.Property(b => b.AccentColor)
            .IsRequired()
            .HasMaxLength(20)
            .HasDefaultValue("#6366f1");

        builder.Property(b => b.TextColor)
            .IsRequired()
            .HasMaxLength(20)
            .HasDefaultValue("#1f2937");

        builder.Property(b => b.BackgroundColor)
            .IsRequired()
            .HasMaxLength(20)
            .HasDefaultValue("#ffffff");

        builder.Property(b => b.IconsColor)
            .IsRequired()
            .HasMaxLength(20)
            .HasDefaultValue("#4b5563");

        builder.Property(b => b.ProfileOpacity)
            .HasDefaultValue(0.95);

        builder.Property(b => b.ProfileBlur)
            .HasDefaultValue(10.5);

        // Effects
        builder.Property(b => b.MouseEffectUrl)
            .HasMaxLength(500);

        builder.Property(b => b.BackgroundEffectId);

        // Metadata
        builder.Property(b => b.Views)
            .HasDefaultValue(0);

        // Relationships
        builder.HasMany(b => b.Musics)
            .WithOne(m => m.BioProfile)
            .HasForeignKey(m => m.BioProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(b => b.Slug)
            .IsUnique();

        builder.HasIndex(b => b.CreatedAt);
    }
}
