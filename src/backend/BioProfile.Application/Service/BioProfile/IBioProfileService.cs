using BioProfile.Domain.Models;
using BioProfile.Domain.Common;

namespace BioProfile.Application.BioProfiles;

/// <summary>
/// Service interface for BioProfile operations.
/// </summary>
public interface IBioProfileService
{
    Task<Result<BioProfileResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result<BioProfileResponse>> GetBySlugAsync(string slug, CancellationToken cancellationToken = default);
    // TODO: Implement after adding UserAccountId FK
    // Task<Result<IReadOnlyList<BioProfileResponse>>> GetByUserAccountIdAsync(Guid userAccountId, CancellationToken cancellationToken = default);
    Task<Result<BioProfileResponse>> CreateAsync(CreateBioProfileRequest request, string userId, CancellationToken cancellationToken = default);
    Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result> IncrementViewsAsync(Guid id, CancellationToken cancellationToken = default);
}
