using BioProfile.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BioProfile.Infrastructure.Data.Configurations;

public class BackgroundEffectConfiguration : IEntityTypeConfiguration<BackgroundEffect>
{
    public void Configure(EntityTypeBuilder<BackgroundEffect> builder)
    {
        builder.ToTable("BackgroundEffects");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.ColorHex)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(x => x.Shape)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.Opacity)
            .IsRequired()
            .HasPrecision(3, 2);

        builder.Property(x => x.SizeMin)
            .IsRequired()
            .HasPrecision(5, 2);

        builder.Property(x => x.SizeMax)
            .IsRequired()
            .HasPrecision(5, 2);

        builder.Property(x => x.Preset)
            .IsRequired()
            .HasConversion<int>();

        builder.Property(x => x.MoveSpeed)
            .IsRequired()
            .HasPrecision(5, 2);

        builder.Property(x => x.ParticleCount)
            .IsRequired();

        builder.Property(x => x.EnableLinks)
            .IsRequired();

        builder.Property(x => x.EnableHoverEffect)
            .IsRequired();

        builder.Property(x => x.IsActive)
            .IsRequired();
    }
}
