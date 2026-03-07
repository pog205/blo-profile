using BioProfile.Domain.Entities;

namespace BioProfile.Domain.IRepositories;

public interface IUserRepository
{
    Task<UserAccount?> GetByEmailAsync(string email);
    Task<UserAccount?> GetByUsernameAsync(string username);
    Task<UserAccount?> GetByIdAsync(Guid id);
    Task AddAsync(UserAccount user);
    Task UpdateAsync(UserAccount user);
    Task<bool> EmailExistsAsync(string email);
    Task<bool> UsernameExistsAsync(string username);
}
