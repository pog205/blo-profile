using BioProfile.Application.Common;
using BioProfile.Domain.IRepositories;
using BioProfile.Domain.Models;

namespace BioProfile.Application.Queries.BioProfileQueries;

public class GetBioProfileUserQuery : IQuery<BioProfileResponse?>
{
    public Guid UserAccountId { get; set; }

    public GetBioProfileUserQuery(Guid userAccountId)
    {
        UserAccountId = userAccountId;
    }
}
public class GetBioProfileUserQueryHandler
    : IQueryHandler<GetBioProfileUserQuery, BioProfileResponse?>
{
    private readonly IUserRepository userRepository;

    public GetBioProfileUserQueryHandler(IUserRepository userRepository)
            {
                this.userRepository = userRepository;
            }

    public async Task<BioProfileResponse?> Handle(GetBioProfileUserQuery request, CancellationToken cancellationToken)
    {
        var result = await userRepository.GetBioProFileByUserAccountIdAsync(request.UserAccountId, cancellationToken);

        if (result is null)
        {
            return null;
        }

        return new BioProfileResponse
        {
            Id = result.Id,
            Slug = result.Slug,
            Name = result.Name,
            Location = result.Location,
            Description = result.Description,
            AvatarUrl = result.AvatarUrl,
            BackgroundUrl = result.BackgroundUrl,
            FontFamily = result.FontFamily,
            AccentColor = result.AccentColor,
            TextColor = result.TextColor,
            BackgroundColor = result.BackgroundColor,
            IconsColor = result.IconsColor,
            ProfileOpacity = result.ProfileOpacity,
            ProfileBlur = result.ProfileBlur,
            MouseEffectUrl = result.MouseEffectUrl,
            BackgroundEffectId = result.BackgroundEffectId,
            Views = result.Views,
            CreatedAt = result.CreatedAt,
            UpdatedAt = result.UpdatedAt
        };
    }
}