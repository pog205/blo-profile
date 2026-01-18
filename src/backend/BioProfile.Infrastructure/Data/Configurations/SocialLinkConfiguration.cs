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

        builder.Property(s => s.Url)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(s => s.Icon)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(s => s.BioProfileId)
            .IsRequired();

        // Indexes
        builder.HasIndex(s => s.BioProfileId);
    }
}
