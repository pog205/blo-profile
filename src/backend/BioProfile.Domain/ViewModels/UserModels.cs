namespace BioProfile.Domain.Models;

public class BioProfileModel
{
    public Guid Id { get;set; }
    public string? Slug { get;set; }
    public Guid UserId { get;set; }
    public string? Name { get;set; }
    public string? Location { get;set; }
    public string? Description { get;set; }
    public string? AvatarUrl { get;set; }
    public string? BackgroundUrl { get;set; }
    public string? FontFamily { get;set; }
    public string? AccentColor { get;set; }
    public string? TextColor { get;set; }
    public string? BackgroundColor { get;set; }
    public string? IconsColor { get;set; }
    public double? ProfileOpacity { get;set; }
    public double? ProfileBlur { get;set; }
    public string? MouseEffectUrl { get;set; }
    public Guid? BackgroundEffectId { get;set; }
    public int? Views { get;set; }
    public ThemeSettings? Theme { get;set; }
    public List<MusicData> Musics { get;set; }
    public EffectSettings Effects { get;set; }
    public DateTime CreatedAt { get;set; }
    public DateTime? UpdatedAt { get;set; }
}