using BioProfile.Application.Common;
using BioProfile.Application.Dtos.LinkDtos;
using BioProfile.Domain.Repositories;

namespace BioProfile.Application.Queries.SocialLinkQueries;

/// <summary>
/// Query to get all social links
/// </summary>
public class GetSocialLinksQuery : IQuery<List<SocialLinkDtos>>
{

}

/// <summary>
/// Handler for GetSocialLinksQuery
/// </summary>
public class GetSocialLinksQueryHandler(ISocialLinkRepository socialLinkRepository)
    : IQueryHandler<GetSocialLinksQuery, List<SocialLinkDtos>>
{
    public async Task<List<SocialLinkDtos>> Handle(GetSocialLinksQuery query, CancellationToken cancellationToken)
    {
        var socialLinks = await socialLinkRepository.GetAllActiveAsync(cancellationToken);

        return socialLinks.Select(s => new SocialLinkDtos
        {
            Id = s.Id,
            Platform = s.Platform,
            Icon = s.Icon
        }).ToList();
    }
}
