using BioProfile.Domain.Entities;
using BioProfile.Domain.IRepositories;
using BioProfile.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BioProfile.Infrastructure.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
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
}
