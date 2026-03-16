public class BioProfileDto
{
    // Identity
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;

    // Profile Settings
    public string Name { get; set; } = string.Empty;
    public string? Location { get; set; }
    public string? Description { get; set; }
    public string? AvatarUrl { get; set; }
    public string? BackgroundUrl { get; set; }

    // Theme Settings
    public string? FontFamily { get; set; }
    public string? AccentColor { get; set; }
    public string? TextColor { get; set; }
    public string? BackgroundColor { get; set; }
    public string? IconsColor { get; set; }
    public double? ProfileOpacity { get; set; }
    public double? ProfileBlur { get; set; }

    // Effects
    public string? MouseEffectUrl { get; set; }
    public Guid? BackgroundEffectId { get; set; }

    // Metadata
    public int? Views { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
