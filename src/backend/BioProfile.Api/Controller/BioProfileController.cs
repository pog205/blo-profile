using BioProfile.Application.Queries.BioProfileQueries;
using BioProfile.Commands.BioProfile;
using BioProfile.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Controller;

public class BioProfileController(
    IMediator mediator,
    ILogger<BioProfileController> logger) : BaseController(mediator, logger)
{

    // GET: api/BioProfile
    [HttpGet]
    public async Task<IActionResult> GetBySlug([FromQuery] string slug)
    {
        // TODO: Implement GetBySlug logic
        var bioProfile = await mediator.Send(new GetBioProfileBySlugQuery (slug));
        return Ok(bioProfile);
    }
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateBioProfileRequest request)
    {
        var command = new UpdateBioProfileCommand(request.Id, request.FieldName, request.FieldValue);
        var result = await mediator.Send(command);
        if (!result.IsSuccess)
        {
            return BadRequest(result);
        }
        return NoContent();
    }
}