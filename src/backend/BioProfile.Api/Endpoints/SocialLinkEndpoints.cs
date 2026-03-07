using BioProfile.Application.Queries.SocialLinkQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Endpoints;

public static class SocialLinkEndpoints
{
    public static void MapSocialLinkEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/social-links")
            .WithTags("Social Links");

        group.MapGet("/", GetAllSocialLinks)
            .WithName("GetAllSocialLinks")
            .WithSummary("Get all available social links")
            .Produces<List<Application.Dtos.LinkDtos.SocialLinkDtos>>(StatusCodes.Status200OK);
    }

    private static async Task<IResult> GetAllSocialLinks(
        [FromServices] IMediator mediator,
        CancellationToken cancellationToken = default)
    {
        var query = new GetSocialLinksQuery();
        var result = await mediator.Send(query, cancellationToken);

        return Results.Ok(result);
    }
}
