using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data.Configurations;

public class UserSocialLinkConfiguration : BaseEntityConfiguration<UserSocialLink, Guid>
{
    protected override void ConfigureEntity(EntityTypeBuilder<UserSocialLink> builder)
    {
        builder.ToTable("UserSocialLinks");

        builder.HasKey(u => u.Id);

        // Foreign Keys
        builder.Property(u => u.BioProfileId)
            .IsRequired();

        builder.Property(u => u.SocialLinkId)
            .IsRequired();

        // Properties
        builder.Property(u => u.Url)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(u => u.DisplayOrder)
            .IsRequired()
            .HasDefaultValue(0);

        // Relationships
        builder.HasOne(u => u.BioProfile)
            .WithMany(b => b.UserSocialLinks)
            .HasForeignKey(u => u.BioProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(u => u.SocialLink)
            .WithMany(s => s.UserSocialLinks)
            .HasForeignKey(u => u.SocialLinkId)
            .OnDelete(DeleteBehavior.Cascade);

        // Indexes
        builder.HasIndex(u => u.BioProfileId);
        builder.HasIndex(u => u.SocialLinkId);
        builder.HasIndex(u => new { u.BioProfileId, u.SocialLinkId })
            .IsUnique();
    }
}
