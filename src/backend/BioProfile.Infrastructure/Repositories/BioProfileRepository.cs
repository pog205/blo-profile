using Microsoft.EntityFrameworkCore;
using BioProfile.Domain.Entities;
using BioProfile.Domain.Repositories;
using BioProfile.Infrastructure.Data;

namespace BioProfile.Infrastructure.Repositories;

/// <summary>
/// BioProfile repository implementation extending generic repository.
/// </summary>
public class BioProfileRepository(ApplicationDbContext context)
    : Repository<BioProfileEntity>(context), IBioProfileRepository
{
    public async Task<BioProfileEntity?> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .Include(b => b.Musics.OrderBy(m => m.Order))
            .Include(b => b.SocialLinks)
            .FirstOrDefaultAsync(b => b.Slug == slug, cancellationToken);
    }

    public async Task<BioProfileEntity?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .Include(b => b.Musics.OrderBy(m => m.Order))
            .Include(b => b.SocialLinks)
            .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
    }

    public async Task<IReadOnlyList<BioProfileEntity>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .Where(b => b.UserId == userId)
            .Include(b => b.Musics.OrderBy(m => m.Order))
            .Include(b => b.SocialLinks)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync(cancellationToken);
    }

    public async Task<bool> SlugExistsAsync(string slug, CancellationToken cancellationToken = default)
    {
        return await DbSet.AnyAsync(b => b.Slug == slug, cancellationToken);
    }

    public async Task IncrementViewsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var bioProfile = await DbSet.FindAsync([id], cancellationToken);
        if (bioProfile is not null)
        {
            bioProfile.Views++;
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
