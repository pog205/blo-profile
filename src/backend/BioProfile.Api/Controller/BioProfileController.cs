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

    // GET: api/BioProfile?slug=...
    [HttpGet]
    public async Task<IActionResult> GetBySlug([FromQuery] string slug)
    {
        var bioProfile = await mediator.Send(new GetBioProfileBySlugQuery(slug));
        return Ok(bioProfile);
    }

    // GET: api/BioProfile/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var bioProfile = await mediator.Send(new GetBioProfileByIdQuery(id));
        if (bioProfile is null)
            return NotFound();
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

    [HttpPost("upload/image")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");
        var result = await mediator.Send(new UploadImageBioProfileCommad(file.OpenReadStream(), file.FileName));
        return Ok(result);
    }
}