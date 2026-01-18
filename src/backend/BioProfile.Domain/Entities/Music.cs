namespace BioProfile.Domain.Entities;

/// <summary>
/// Represents a music track on bio profile.
/// </summary>
public class Music : BaseEntity
{
    public string Title { get; set; } = null!;

    public string MusicUrl { get; set; } = null!;

    /// <summary>
    /// Display order of the music track.
    /// </summary>
    public int Order { get; set; }

    // Foreign key
    public Guid BioProfileId { get; set; }
    public BioProfileEntity BioProfile { get; set; } = null!;
}
