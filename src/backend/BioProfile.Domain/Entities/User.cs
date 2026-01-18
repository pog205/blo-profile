namespace BioProfile.Domain.Entities;

/// <summary>
/// Represents a BioProfile - bio-link profile entity.
/// </summary>
public class BioProfileEntity : BaseEntity
{
    // Profile Settings
    public string Slug { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string EnglishName { get; set; } = null!;
    public string? Location { get; set; }
    public string? Description { get; set; }
    public string AvatarUrl { get; set; } = null!;
    public string BackgroundUrl { get; set; } = null!;

    // Theme Settings
    public string FontFamily { get; set; } = "Inter";
    public string AccentColor { get; set; } = "#6366f1";
    public string TextColor { get; set; } = "#1f2937";
    public string BackgroundColor { get; set; } = "#ffffff";
    public string IconsColor { get; set; } = "#4b5563";
    public double ProfileOpacity { get; set; } = 0.95;
    public double ProfileBlur { get; set; } = 10.5;

    // Effects
    public int MouseEffect { get; set; } // Store as int for enum
    public int BackgroundEffect { get; set; } // Store as int for enum

    // Metadata
    public string UserId { get; set; } = null!;
    public int Views { get; set; }

    // Navigation properties
    public ICollection<Music> Musics { get; set; } = [];
    public ICollection<SocialLink> SocialLinks { get; set; } = [];
}
