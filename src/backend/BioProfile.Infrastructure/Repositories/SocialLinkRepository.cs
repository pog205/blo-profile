using BioProfile.Domain.Entities;
using BioProfile.Domain.Enums;
using BioProfile.Domain.Repositories;
using BioProfile.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BioProfile.Infrastructure.Repositories;

public class SocialLinkRepository(ApplicationDbContext context)
    : Repository<SocialLink>(context), ISocialLinkRepository
{
    public async Task<IReadOnlyList<SocialLink>> GetAllActiveAsync(CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .OrderBy(s => s.Platform)
            .ToListAsync(cancellationToken);
    }

    public async Task<SocialLink?> GetByPlatformAsync(SocialPlatform platform, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.Platform == platform, cancellationToken);
    }
}
