using BioProfile.Application.Dtos.AuthDtos;

namespace BioProfile.Application.Auth;

public interface IJwtService
{
    string GenerateAccessToken(Guid userId, string email, string username);
    string GenerateRefreshToken();
    DateTime GetTokenExpiration();
}
