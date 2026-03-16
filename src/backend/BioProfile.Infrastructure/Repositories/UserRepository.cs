using BioProfile.Domain.Entities;
using BioProfile.Domain.IRepositories;
using BioProfile.Domain.Models;
using BioProfile.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BioProfile.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : Repository<UserAccount>(context), IUserRepository
{
    public async Task<UserAccount?> GetByEmailAsync(string email)
    {
        return await context.UserAccounts.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<UserAccount?> GetByUsernameAsync(string username)
    {
        return await context.UserAccounts.FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<UserAccount?> GetByIdAsync(Guid id)
    {
        return await context.UserAccounts.FindAsync(id);
    }

    public async Task AddAsync(UserAccount user)
    {
        await context.UserAccounts.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(UserAccount user)
    {
        context.UserAccounts.Update(user);
        await context.SaveChangesAsync();
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await context.UserAccounts.AnyAsync(u => u.Email == email);
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await context.UserAccounts.AnyAsync(u => u.Username == username);
    }
    public async Task<BioProfileModel> GetBioProFileByUserAccountIdAsync(Guid userAccountId, CancellationToken cancellationToken = default)
    {
        return await DbSet
            .AsNoTracking()
            .Where(u => u.Id == userAccountId)
            .Select(u => new BioProfileModel
            {
                 Id = u.BioProfile.Id,
                Slug = u.BioProfile.Slug,
                UserId = u.Id,
                Name = u.BioProfile.Name,
                Location = u.BioProfile.Location,
                Description = u.BioProfile.Description,
                AvatarUrl = u.BioProfile.AvatarUrl,
                BackgroundUrl = u.BioProfile.BackgroundUrl,
                FontFamily = u.BioProfile.FontFamily,
                AccentColor = u.BioProfile.AccentColor,
                TextColor = u.BioProfile.TextColor,
                BackgroundColor = u.BioProfile.BackgroundColor,
                IconsColor = u.BioProfile.IconsColor,
                ProfileOpacity = u.BioProfile.ProfileOpacity,
                ProfileBlur = u.BioProfile.ProfileBlur,
                MouseEffectUrl = u.BioProfile.MouseEffectUrl,
                BackgroundEffectId = u.BioProfile.BackgroundEffectId,
                Views = u.BioProfile.Views,
                Theme = null, // Map nếu có dữ liệu theme, nếu không thì để null
                Musics = u.BioProfile.Musics.Select(m => new MusicData(m.Title, m.MusicUrl, m.DisplayOrder)).ToList(),
                Effects = null, // Map nếu có dữ liệu effects, nếu không thì để null
                CreatedAt = u.BioProfile.CreatedAt,
                UpdatedAt = u.BioProfile.UpdatedAt
            })
            .FirstOrDefaultAsync(cancellationToken);
    }

    public Task<UserAccount?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<UserAccount>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<UserAccount> AddAsync(UserAccount entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(UserAccount entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(UserAccount entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
