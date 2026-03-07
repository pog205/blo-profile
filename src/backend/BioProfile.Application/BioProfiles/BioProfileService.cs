using BioProfile.Domain.Models;
using BioProfile.Domain.Common;
using BioProfile.Domain.Entities;
using BioProfile.Domain.Repositories;
using BioProfile.Domain.Enums;

namespace BioProfile.Application.BioProfiles;

/// <summary>
/// Service implementation for BioProfile operations.
/// </summary>
public class BioProfileService(IBioProfileRepository bioProfileRepository) : IBioProfileService
{
    public async Task<Result<BioProfileResponse>> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var bioProfile = await bioProfileRepository.GetByIdWithDetailsAsync(id, cancellationToken);

        if (bioProfile is null)
        {
            return Result<BioProfileResponse>.Failure("BioProfile not found", "BIOPROFILE_NOT_FOUND");
        }

        return Result<BioProfileResponse>.Success(MapToResponse(bioProfile));
    }

    public async Task<Result<BioProfileResponse>> GetBySlugAsync(string slug, CancellationToken cancellationToken = default)
    {
        var bioProfile = await bioProfileRepository.GetBySlugAsync(slug, cancellationToken);

        if (bioProfile is null)
        {
            return Result<BioProfileResponse>.Failure("BioProfile not found", "BIOPROFILE_NOT_FOUND");
        }

        return Result<BioProfileResponse>.Success(MapToResponse(bioProfile));
    }

    // TODO: Implement after adding UserAccountId FK to BioProfileEntity
    // public async Task<Result<IReadOnlyList<BioProfileResponse>>> GetByUserAccountIdAsync(Guid userAccountId, CancellationToken cancellationToken = default)
    // {
    //     var bioProfiles = await bioProfileRepository.GetByUserAccountIdAsync(userAccountId, cancellationToken);
    //     var response = bioProfiles.Select(MapToResponse).ToList();
    //     return Result<IReadOnlyList<BioProfileResponse>>.Success(response);
    // }

    public async Task<Result<BioProfileResponse>> CreateAsync(CreateBioProfileRequest request, string userId, CancellationToken cancellationToken = default)
    {
        // Check if slug already exists
        if (await bioProfileRepository.SlugExistsAsync(request.Profile.Slug, cancellationToken))
        {
            return Result<BioProfileResponse>.Failure("Slug already exists", "SLUG_EXISTS");
        }

        var bioProfileEntity = new BioProfileEntity
        {
            Id = Guid.NewGuid(),
            Slug = request.Profile.Slug,
            Name = request.Profile.Name,
            EnglishName = request.Profile.EnglishName,
            Location = request.Profile.Location,
            Description = request.Profile.Description,
            AvatarUrl = request.Profile.AvatarUrl,
            BackgroundUrl = request.Profile.BackgroundUrl,
            FontFamily = request.Theme.FontFamily,
            AccentColor = request.Theme.Colors.Accent,
            TextColor = request.Theme.Colors.Text,
            BackgroundColor = request.Theme.Colors.Background,
            IconsColor = request.Theme.Colors.Icons,
            ProfileOpacity = request.Theme.ProfileOpacity,
            ProfileBlur = request.Theme.ProfileBlur,
            MouseEffectUrl = request.Effects.MouseEffectUrl,
            BackgroundEffectId = request.Effects.BackgroundEffectId,
            Views = 0
        };

        // Add musics
        foreach (var music in request.Musics)
        {
            bioProfileEntity.Musics.Add(new Music
            {
                Id = Guid.NewGuid(),
                Title = music.Title,
                MusicUrl = music.MusicUrl,
                DisplayOrder = music.Order,
                BioProfileId = bioProfileEntity.Id
            });
        }

        // Add social links
        foreach (var socialLink in request.SocialLinks)
        {
            bioProfileEntity.UserSocialLinks.Add(new UserSocialLink
            {
                Id = Guid.NewGuid(),
                BioProfileId = bioProfileEntity.Id,
                SocialLinkId = socialLink.SocialLinkId,
                Url = socialLink.Url,
                DisplayOrder = socialLink.DisplayOrder
            });
        }

        var created = await bioProfileRepository.AddAsync(bioProfileEntity, cancellationToken);

        return Result<BioProfileResponse>.Success(MapToResponse(created));
    }

    public async Task<Result<BioProfileResponse>> UpdateAsync(Guid id, UpdateBioProfileRequest request, CancellationToken cancellationToken = default)
    {
        var bioProfile = await bioProfileRepository.GetByIdAsync(id, cancellationToken);

        if (bioProfile is null)
        {
            return Result<BioProfileResponse>.Failure("BioProfile not found", "BIOPROFILE_NOT_FOUND");
        }

        // Update profile settings
        if (request.Profile is not null)
        {
            bioProfile.Name = request.Profile.Name;
            bioProfile.EnglishName = request.Profile.EnglishName;
            bioProfile.Location = request.Profile.Location;
            bioProfile.Description = request.Profile.Description;
            bioProfile.AvatarUrl = request.Profile.AvatarUrl;
            bioProfile.BackgroundUrl = request.Profile.BackgroundUrl;
        }

        // Update theme settings
        if (request.Theme is not null)
        {
            bioProfile.FontFamily = request.Theme.FontFamily;
            bioProfile.AccentColor = request.Theme.Colors.Accent;
            bioProfile.TextColor = request.Theme.Colors.Text;
            bioProfile.BackgroundColor = request.Theme.Colors.Background;
            bioProfile.IconsColor = request.Theme.Colors.Icons;
            bioProfile.ProfileOpacity = request.Theme.ProfileOpacity;
            bioProfile.ProfileBlur = request.Theme.ProfileBlur;
        }

        // Update effects
        if (request.Effects is not null)
        {
            bioProfile.MouseEffectUrl = request.Effects.MouseEffectUrl;
            bioProfile.BackgroundEffectId = request.Effects.BackgroundEffectId;
        }

        await bioProfileRepository.UpdateAsync(bioProfile, cancellationToken);

        return Result<BioProfileResponse>.Success(MapToResponse(bioProfile));
    }

    public async Task<Result> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var bioProfile = await bioProfileRepository.GetByIdAsync(id, cancellationToken);

        if (bioProfile is null)
        {
            return Result.Failure("BioProfile not found", "BIOPROFILE_NOT_FOUND");
        }

        await bioProfileRepository.DeleteAsync(bioProfile, cancellationToken);

        return Result.Success();
    }

    public async Task<Result> IncrementViewsAsync(Guid id, CancellationToken cancellationToken = default)
    {
        await bioProfileRepository.IncrementViewsAsync(id, cancellationToken);
        return Result.Success();
    }

    private static BioProfileResponse MapToResponse(BioProfileEntity entity)
    {
        return new BioProfileResponse(
            entity.Id,
            Guid.Empty, // UserId removed
            new ProfileSettings(
                entity.Slug,
                entity.Name,
                entity.EnglishName,
                entity.Location,
                entity.Description,
                entity.AvatarUrl,
                entity.BackgroundUrl
            ),
            new TechnicalProps(
                new ThemeSettings(
                    entity.FontFamily,
                    new ColorScheme(
                        entity.AccentColor,
                        entity.TextColor,
                        entity.BackgroundColor,
                        entity.IconsColor
                    ),
                    entity.ProfileOpacity,
                    entity.ProfileBlur
                ),
                entity.Musics.Select(m => new MusicData(m.Title, m.MusicUrl, m.DisplayOrder)).ToList(),
                entity.UserSocialLinks
                    .Select(usl => new SocialLinkData(usl.SocialLinkId, usl.Url, usl.SocialLink.Icon, usl.SocialLink.Platform, usl.DisplayOrder))
                    .ToList()
            ),
            new SimulationProps(
                new EffectSettings(
                    entity.MouseEffectUrl,
                    entity.BackgroundEffectId
                )
            ),
            entity.Views,
            entity.CreatedAt,
            entity.UpdatedAt ?? entity.CreatedAt
        );
    }
}
