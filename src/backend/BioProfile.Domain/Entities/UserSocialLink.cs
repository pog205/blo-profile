namespace BioProfile.Domain.Entities;

/// <summary>
/// Junction table entity representing user's social media links.
/// Links a BioProfile to a SocialLink with specific URL and display order.
/// </summary>
public class UserSocialLink : BaseEntity
{
    /// <summary>
    /// Foreign key to BioProfile.
    /// </summary>
    public Guid BioProfileId { get; set; }

    /// <summary>
    /// Navigation property to BioProfile.
    /// </summary>
    public BioProfileEntity BioProfile { get; set; } = null!;

    /// <summary>
    /// Foreign key to SocialLink (platform).
    /// </summary>
    public Guid SocialLinkId { get; set; }

    /// <summary>
    /// Navigation property to SocialLink.
    /// </summary>
    public SocialLink SocialLink { get; set; } = null!;

    /// <summary>
    /// User's specific URL for this social platform.
    /// </summary>
    public string Url { get; set; } = null!;

    /// <summary>
    /// Display order of the social link on this specific bio profile.
    /// </summary>
    public int DisplayOrder { get; set; }
}
