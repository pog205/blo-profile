using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BioProfile.Api.Controller;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public abstract class BaseController(
    IMediator mediator,
    ILogger logger) : ControllerBase
{
    protected readonly IMediator Mediator = mediator;
    protected readonly ILogger Logger = logger;
}
