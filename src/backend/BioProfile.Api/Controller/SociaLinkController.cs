using BioProfile.Application.Queries.SocialLinkQueries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Controller;

public class SociaLinkController(
    IMediator mediator,
    ILogger<SociaLinkController> logger) : BaseController(mediator, logger)
{
    // GET: api/SociaLink
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await mediator.Send(new GetSocialLinksQuery());
        return Ok(result);
    }
}
