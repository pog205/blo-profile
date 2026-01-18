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
    Task<Result<IReadOnlyList<BioProfileResponse>>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
    Task<Result<BioProfileResponse>> CreateAsync(CreateBioProfileRequest request, string userId, CancellationToken cancellationToken = default);
    Task<Result<BioProfileResponse>> UpdateAsync(Guid id, UpdateBioProfileRequest request, CancellationToken cancellationToken = default);
    Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    Task<Result> IncrementViewsAsync(Guid id, CancellationToken cancellationToken = default);
}
