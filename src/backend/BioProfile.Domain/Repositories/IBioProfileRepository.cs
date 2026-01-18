using BioProfile.Domain.Entities;

namespace BioProfile.Domain.Repositories;

/// <summary>
/// Repository interface for BioProfile entity.
/// Extends generic repository with BioProfile-specific operations.
/// </summary>
public interface IBioProfileRepository : IRepository<BioProfileEntity>
{
    Task<BioProfileEntity?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
    Task<BioProfileEntity?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<BioProfileEntity>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken = default);
    Task IncrementViewsAsync(Guid id, CancellationToken cancellationToken = default);
}
