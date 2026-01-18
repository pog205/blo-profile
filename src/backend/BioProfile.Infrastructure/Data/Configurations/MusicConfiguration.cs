using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data.Configurations;

public class MusicConfiguration : BaseEntityConfiguration<Music, Guid>
{
    protected override void ConfigureEntity(EntityTypeBuilder<Music> builder)
    {
        builder.ToTable("Musics");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Id)
            .ValueGeneratedNever();

        builder.Property(m => m.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(m => m.MusicUrl)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(m => m.Order)
            .IsRequired();

        builder.Property(m => m.BioProfileId)
            .IsRequired();

        // Indexes
        builder.HasIndex(m => m.BioProfileId);
        builder.HasIndex(m => new { m.BioProfileId, m.Order });
    }
}
