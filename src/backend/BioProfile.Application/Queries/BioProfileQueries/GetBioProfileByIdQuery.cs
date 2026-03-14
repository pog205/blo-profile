using BioProfile.Application.BioProfiles;
using BioProfile.Application.Common;

namespace BioProfile.Application.Queries.BioProfileQueries;

public class GetBioProfileByIdQuery : IQuery<BioProfileDto?>
{
    public Guid Id { get; set; }

    public GetBioProfileByIdQuery(Guid id)
    {
        Id = id;
    }
}

public class GetBioProfileByIdQueryHandler(IBioProfileService bioProfileService)
    : IQueryHandler<GetBioProfileByIdQuery, BioProfileDto?>
{
    public async Task<BioProfileDto?> Handle(GetBioProfileByIdQuery request, CancellationToken cancellationToken)
    {
        var result = await bioProfileService.GetByIdAsync(request.Id, cancellationToken);

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
