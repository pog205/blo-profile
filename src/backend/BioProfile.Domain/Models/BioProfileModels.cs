using BioProfile.Domain.Enums;

namespace BioProfile.Domain.Models;

/// <summary>
/// Represents the bio-link profile JSON data structure.
/// </summary>
public record BioProfileData(
    Guid Id,
    string UserId,
    ProfileSettings Profile,
    ThemeSettings Theme,
    List<MusicData> Musics,
    List<SocialLinkData> SocialLinks,
    EffectSettings Effects,
    int Views,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

/// <summary>
/// Profile basic settings.
/// </summary>
public record ProfileSettings(
    string Slug,
    string Name,
    string EnglishName,
    string? Location,
    string? Description,
    string AvatarUrl,
    string BackgroundUrl
);

/// <summary>
/// Theme and color settings.
/// </summary>
public record ThemeSettings(
    string FontFamily,
    ColorScheme Colors,
    double ProfileOpacity,
    double ProfileBlur
);

/// <summary>
/// Color scheme configuration.
/// </summary>
public record ColorScheme(
    string Accent,
    string Text,
    string Background,
    string Icons
);

/// <summary>
/// Music track data.
/// </summary>
public record MusicData(
    string Title,
    string MusicUrl,
    int Order
);

/// <summary>
/// Social link data.
/// </summary>
public record SocialLinkData(
    Guid SocialLinkId,
    string Url,
    string Icon,
    SocialPlatform Platform,
    int DisplayOrder
);

/// <summary>
/// Visual effects settings.
/// </summary>
public record EffectSettings(
    string? MouseEffectUrl,
    Guid? BackgroundEffectId
);

// ============================================================================
// Technical & Simulation Props
// ============================================================================

/// <summary>
/// Technical properties - rendering, styling, and UI configuration.
/// </summary>
public record TechnicalProps(
    ThemeSettings Theme,
    List<MusicData> Musics,
    List<SocialLinkData> SocialLinks
);

/// <summary>
/// Simulation properties - interactive effects and animations.
/// </summary>
public record SimulationProps(
    EffectSettings Effects
);

// ============================================================================
// BioProfile with Separated Concerns
// ============================================================================

/// <summary>
/// Complete BioProfile data structure with separated technical and simulation props.
/// </summary>
public record BioProfile(
    ProfileSettings Profile,
    TechnicalProps TechnicalProps,
    SimulationProps SimulationProps
);

/// <summary>
/// BioProfile entity with metadata for persistence.
/// </summary>
public record BioProfileDataRecord(
    Guid Id,
    Guid UserId,
    ProfileSettings Profile,
    TechnicalProps TechnicalProps,
    SimulationProps SimulationProps,
    int Views,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

// ============================================================================
// Helper Extension Methods
// ============================================================================

public static class BioProfileExtensions
{
    /// <summary>
    /// Converts BioProfileData to BioProfile with separated props.
    /// </summary>
    public static BioProfile ToBioProfile(this BioProfileData data)
    {
        return new BioProfile(
            data.Profile,
            new TechnicalProps(data.Theme, data.Musics, data.SocialLinks),
            new SimulationProps(data.Effects)
        );
    }

    /// <summary>
    /// Converts BioProfile to BioProfileData (flat structure).
    /// </summary>
    public static BioProfileData ToBioProfileData(this BioProfile bioProfile, Guid id, string userId, int views = 0)
    {
        return new BioProfileData(
            id,
            userId,
            bioProfile.Profile,
            bioProfile.TechnicalProps.Theme,
            bioProfile.TechnicalProps.Musics,
            bioProfile.TechnicalProps.SocialLinks,
            bioProfile.SimulationProps.Effects,
            views,
            DateTime.UtcNow,
            DateTime.UtcNow
        );
    }

    /// <summary>
    /// Creates BioProfileDataRecord from BioProfile with metadata.
    /// </summary>
    public static BioProfileDataRecord ToDataRecord(this BioProfile bioProfile, Guid id, Guid userId, int views = 0)
    {
        return new BioProfileDataRecord(
            id,
            userId,
            bioProfile.Profile,
            bioProfile.TechnicalProps,
            bioProfile.SimulationProps,
            views,
            DateTime.UtcNow,
            DateTime.UtcNow
        );
    }
}

// ============================================================================
// Request & Response DTOs
// ============================================================================

/// <summary>
/// Request DTO for creating a new BioProfile.
/// </summary>
public record CreateBioProfileRequest(
    ProfileSettings Profile,
    ThemeSettings Theme,
    List<MusicData> Musics,
    List<SocialLinkData> SocialLinks,
    EffectSettings Effects
);

/// <summary>
/// Request DTO for updating an existing BioProfile.
/// </summary>
public record UpdateBioProfileRequest(
    ProfileSettings? Profile,
    ThemeSettings? Theme,
    List<MusicData>? Musics,
    List<SocialLinkData>? SocialLinks,
    EffectSettings? Effects
);

/// <summary>
/// Response DTO for BioProfile with full metadata.
/// </summary>
public record BioProfileResponse(
    Guid Id,
    Guid UserId,
    ProfileSettings Profile,
    TechnicalProps TechnicalProps,
    SimulationProps SimulationProps,
    int Views,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

/// <summary>
/// Extension methods for DTOs.
/// </summary>
public static class BioProfileDtoExtensions
{
    /// <summary>
    /// Converts CreateBioProfileRequest to BioProfile.
    /// </summary>
    public static BioProfile ToBioProfile(this CreateBioProfileRequest request)
    {
        return new BioProfile(
            request.Profile,
            new TechnicalProps(request.Theme, request.Musics, request.SocialLinks),
            new SimulationProps(request.Effects)
        );
    }

    /// <summary>
    /// Converts BioProfileDataRecord to BioProfileResponse.
    /// </summary>
    public static BioProfileResponse ToResponse(this BioProfileDataRecord entity)
    {
        return new BioProfileResponse(
            entity.Id,
            entity.UserId,
            entity.Profile,
            entity.TechnicalProps,
            entity.SimulationProps,
            entity.Views,
            entity.CreatedAt,
            entity.UpdatedAt
        );
    }
}
