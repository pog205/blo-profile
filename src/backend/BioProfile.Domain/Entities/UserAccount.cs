namespace BioProfile.Domain.Entities;

/// <summary>
/// Represents a user in the system with authentication credentials.
/// </summary>
public class UserAccount : BaseEntity
{
    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    // Navigation property
    public BioProfileEntity? BioProfile { get; set; }
}
