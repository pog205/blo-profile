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

    
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateBioProfileRequest request)
    {
        var command = new UpdateBioProfileCommand(request.Id, request.FieldName, request.FieldValue);
        var result = await mediator.Send(command);
        if (!result.IsSuccess)
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");
        var result = await mediator.Send(new UploadImageBioProfileCommad(file.OpenReadStream(), file.FileName));
        UpdateBioProfile(result);
        return Ok(result);
    }
    private async Task UpdateBioProfile(string idFile)
    {
        var id = Request.Headers["id"].ToString();
    var name = Request.Headers["name"].ToString();
        await mediator.Send(new UpdateBioProfileCommand(id,name,idFile));
        throw new NotImplementedException();
    }
    [HttpGet("{userId:guid}")]
    public async Task<IActionResult> GetBioProfileUser([FromRoute] Guid userId)
    {
        var result = await mediator.Send(new GetBioProfileUserQuery(userId));
        return Ok(result);
    }
}