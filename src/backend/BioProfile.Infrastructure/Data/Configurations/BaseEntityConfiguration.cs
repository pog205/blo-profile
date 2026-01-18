using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BioProfile.Infrastructure.Data.Configurations;

/// <summary>
/// Base class for entity configurations that provides common configuration patterns.
/// </summary>
/// <typeparam name="TEntity">The entity type to configure.</typeparam>
public abstract class BaseEntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity>
    where TEntity : class
{
    public void Configure(EntityTypeBuilder<TEntity> builder)
    {
        ConfigureEntity(builder);
    }

    /// <summary>
    /// Override this method to configure the specific entity.
    /// </summary>
    /// <param name="builder">The entity type builder.</param>
    protected abstract void ConfigureEntity(EntityTypeBuilder<TEntity> builder);
}

/// <summary>
/// Base class for entity configurations with a primary key of type TKey.
/// </summary>
/// <typeparam name="TEntity">The entity type to configure.</typeparam>
/// <typeparam name="TKey">The type of the primary key.</typeparam>
public abstract class BaseEntityConfiguration<TEntity, TKey> : IEntityTypeConfiguration<TEntity>
    where TEntity : class
{
    public void Configure(EntityTypeBuilder<TEntity> builder)
    {
        // Configure common auditable fields if the entity has them
        ConfigureAuditableFields(builder);

        // Configure the specific entity
        ConfigureEntity(builder);
    }

    /// <summary>
    /// Override this method to configure the specific entity.
    /// </summary>
    /// <param name="builder">The entity type builder.</param>
    protected abstract void ConfigureEntity(EntityTypeBuilder<TEntity> builder);

    /// <summary>
    /// Configures common auditable fields like CreatedAt, UpdatedAt, CreatedBy, UpdatedBy.
    /// Override this method to customize or disable auditable field configuration.
    /// </summary>
    /// <param name="builder">The entity type builder.</param>
    protected virtual void ConfigureAuditableFields(EntityTypeBuilder<TEntity> builder)
    {
        // Check if entity has common auditable properties and configure them
        var entityType = typeof(TEntity);

        if (entityType.GetProperty("CreatedAt") != null)
        {
            builder.Property<DateTime>("CreatedAt")
                .IsRequired();
        }

        if (entityType.GetProperty("UpdatedAt") != null)
        {
            builder.Property<DateTime?>("UpdatedAt");
        }

        if (entityType.GetProperty("CreatedBy") != null)
        {
            builder.Property<string>("CreatedBy")
                .HasMaxLength(256);
        }

        if (entityType.GetProperty("UpdatedBy") != null)
        {
            builder.Property<string>("UpdatedBy")
                .HasMaxLength(256);
        }
    }
}
