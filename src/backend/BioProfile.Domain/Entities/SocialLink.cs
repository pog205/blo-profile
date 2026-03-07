using BioProfile.Domain.Enums;

namespace BioProfile.Domain.Entities;

/// <summary>
/// Represents a social media platform (master data).
/// </summary>
public class SocialLink : BaseEntity
{
    public SocialPlatform Platform { get; set; }

    public string Icon { get; set; } = null!;


    public ICollection<UserSocialLink> UserSocialLinks { get; set; } = [];
}
