namespace BioProfile.Domain.Entities;

/// <summary>
/// Base class for all entities.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; }

    // Auditable fields
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}

/// <summary>
/// Base class for entities with a specific key type.
/// </summary>
/// <typeparam name="TKey">The type of the primary key.</typeparam>
public abstract class BaseEntity<TKey>
{
    public TKey Id { get; set; } = default!;

    // Auditable fields
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public string? UpdatedBy { get; set; }
}
