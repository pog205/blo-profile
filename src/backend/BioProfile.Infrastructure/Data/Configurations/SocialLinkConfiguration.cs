using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data.Configurations;

public class SocialLinkConfiguration : BaseEntityConfiguration<SocialLink, Guid>
{
    protected override void ConfigureEntity(EntityTypeBuilder<SocialLink> builder)
    {
        builder.ToTable("SocialLinks");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Id)
            .ValueGeneratedNever();

        builder.Property(s => s.Platform)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(s => s.Icon)
            .IsRequired()
            .HasMaxLength(100);

        // Unique constraint - each platform only once
        builder.HasIndex(s => s.Platform)
            .IsUnique();

        // Navigation
        builder.HasMany(s => s.UserSocialLinks)
            .WithOne(u => u.SocialLink)
            .HasForeignKey(u => u.SocialLinkId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
