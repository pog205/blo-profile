using BioProfile.Domain.Enums;

namespace BioProfile.Application.Dtos.LinkDtos;

/// <summary>
/// DTO for SocialLink response
/// </summary>
public class SocialLinkDtos
{
    public Guid Id { get; set; }
    public SocialPlatform Platform { get; set; }
    public string Icon { get; set; } = null!;
}

