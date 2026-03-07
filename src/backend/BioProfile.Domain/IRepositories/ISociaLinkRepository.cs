using BioProfile.Domain.Entities;

namespace BioProfile.Domain.Repositories;

/// <summary>
/// Repository interface for SocialLink entity
/// </summary>
public interface ISocialLinkRepository : IRepository<SocialLink>
{
    Task<IReadOnlyList<SocialLink>> GetAllActiveAsync(CancellationToken cancellationToken = default);
    Task<SocialLink?> GetByPlatformAsync(Enums.SocialPlatform platform, CancellationToken cancellationToken = default);
}
