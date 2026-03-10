using BioProfile.Application.BioProfiles;
using BioProfile.Application.Common;

namespace BioProfile.Application.Queries.BioProfileQueries;

public class GetBioProfileBySlugQuery : IQuery<BioProfileDto?>
{
    public string Slug { get; set; }

    public GetBioProfileBySlugQuery(string slug)
    {
        Slug = slug;
    }
}

public class GetBioProfileBySlugQueryHandler(IBioProfileService bioProfileService)
    : IQueryHandler<GetBioProfileBySlugQuery, BioProfileDto?>
{
    public async Task<BioProfileDto?> Handle(GetBioProfileBySlugQuery request, CancellationToken cancellationToken)
    {
        var result = await bioProfileService.GetBySlugAsync(request.Slug, cancellationToken);

        if (!result.IsSuccess || result.Value is null)
        {
            return null;
        }

        return new BioProfileDto
        {
            Id = result.Value.Id,
            Slug = result.Value.Profile.Slug,
            Name = result.Value.Profile.Name,
            Bio = result.Value.Profile.Description,
            ProfilePictureUrl = result.Value.Profile.AvatarUrl,
            CreatedAt = result.Value.CreatedAt
        };
    }
}