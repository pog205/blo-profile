using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BioProfile.Domain.Entities;

namespace BioProfile.Infrastructure.Data.Configurations;

public class UserAccountConfiguration : BaseEntityConfiguration<UserAccount, Guid>
{
    protected override void ConfigureEntity(EntityTypeBuilder<UserAccount> builder)
    {
        builder.ToTable("UserAccounts");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Username)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.PasswordHash)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(u => u.RefreshToken)
            .HasMaxLength(500);

        // Unique constraints
        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.HasIndex(u => u.Username)
            .IsUnique();

        // Relationship with BioProfile
        builder.HasOne(u => u.BioProfile)
            .WithOne(b => b.UserAccount)
            .HasForeignKey<BioProfileEntity>(b => b.UserAccountId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
