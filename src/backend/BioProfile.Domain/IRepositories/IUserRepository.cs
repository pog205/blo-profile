using BioProfile.Domain.Entities;
using BioProfile.Domain.Models;
using BioProfile.Domain.Repositories;

namespace BioProfile.Domain.IRepositories;

public interface IUserRepository : IRepository<UserAccount>
{
    Task<UserAccount?> GetByEmailAsync(string email);
    Task<UserAccount?> GetByUsernameAsync(string username);
    Task<UserAccount?> GetByIdAsync(Guid id);
    Task AddAsync(UserAccount user);
    Task UpdateAsync(UserAccount user);
    Task<bool> EmailExistsAsync(string email);
    Task<bool> UsernameExistsAsync(string username);

    Task<BioProfileModel> GetBioProFileByUserAccountIdAsync(Guid userAccountId, CancellationToken cancellationToken = default);
}
