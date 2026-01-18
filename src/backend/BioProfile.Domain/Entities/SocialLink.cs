using BioProfile.Domain.Enums;

namespace BioProfile.Domain.Entities;

/// <summary>
/// Represents a social media link on bio profile.
/// </summary>
public class SocialLink : BaseEntity
{
    /// <summary>
    /// Social media platform type.
    /// </summary>
    public SocialPlatform Platform { get; set; }

    public string Url { get; set; } = null!;

    public string Icon { get; set; } = null!;

    // Foreign key
    public Guid BioProfileId { get; set; }
    public BioProfileEntity BioProfile { get; set; } = null!;
}
